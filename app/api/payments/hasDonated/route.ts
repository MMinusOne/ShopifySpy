import { neon } from '@neondatabase/serverless';
import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, res: NextApiResponse) {
    try {
        const reqData = await req.json();

        if (!reqData.userId) {
            return Response.json({ hasDonated: false }, { status: 401 });
        }

        const sql = neon(process.env.NEON_DATABASE_URL!);

        const result = await sql`
        SELECT EXISTS (
            SELECT 1 FROM donors WHERE user_id = ${reqData.userId}
        ) as has_donated
    `;

        const hasDonated = result[0].has_donated;

        return Response.json({ hasDonated });
    } catch (error) {
        console.error(error)
        return Response.json({ message: 'An error has occured' }, { status: 500 })
    }
}