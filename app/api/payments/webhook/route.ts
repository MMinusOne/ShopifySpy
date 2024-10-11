import crypto from 'crypto';
import { neon } from '@neondatabase/serverless';

export async function POST(req: Request) {
    try {
        const clonedReq = req.clone();
        const eventType = req.headers.get("X-Event-Name");
        const body = await req.json();

        const secret: string = process.env.LEMONSQUEEZY_WEBHOOK_SIGNATURE!;
        const hmac = crypto.createHmac("sha256", secret);
        const digest = Buffer.from(hmac.update(await clonedReq.text()).digest("hex"), "utf-8");
        const signature = Buffer.from(req.headers.get("X-Signature") || "", "utf-8");

        if (!crypto.timingSafeEqual(digest, signature)) {
            throw new Error('Invalid signature')
        }

        console.log(body);

        if (eventType === 'order_created') {
            const userId = body.meta.custom_data.user_id;
            const isSuccess = body.data.attributes.status === "paid";
            if (isSuccess) {
                const amountPaid = body.data.attributes.total;
                const sql = neon(process.env.NEON_DATABASE_URL!);

                await sql`
                    UPDATE donation_goal
                    SET current_amount = current_amount + ${amountPaid}
                `;

                await sql`
                    INSERT INTO donors (user_id, amount)
                    VALUES (${userId}, ${amountPaid})
                    ON CONFLICT (user_id) DO UPDATE
                    SET amount = donors.amount + EXCLUDED.amount
                `;
            }
        }

        return Response.json({ message: "Webhook recieved" })
    } catch (error) {
        console.log(error);
        return Response.json({ message: "Server error " }, { status: 500 })
    }
}