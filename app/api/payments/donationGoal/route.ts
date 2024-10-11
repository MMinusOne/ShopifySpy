import { neon } from '@neondatabase/serverless';
import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

export async function GET() {
    try {
        const sql = neon(process.env.NEON_DATABASE_URL!);
        const [updatedDonationGoal] = await sql`
                    SELECT * FROM donation_goal
                `;

        return Response.json({
            donationGoal: updatedDonationGoal
        });

    } catch (error) {
        console.log(error);
        return Response.json({ message: "Server error" }, { status: 500 });
    }
}