import { neon } from '@neondatabase/serverless';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const sql = neon(process.env.NEON_DATABASE_URL!);
        const [donationGoal] = await sql`
                    SELECT * FROM donation_goal
                `;

        return Response.json({
            donationGoal: donationGoal
        });

    } catch (error) {
        console.log(error);
        return Response.json({ message: "Server error" }, { status: 500 });
    }
}