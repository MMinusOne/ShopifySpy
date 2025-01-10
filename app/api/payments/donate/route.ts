import { lemonSqueezyApiInstance } from "@/components/axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// Change the POST function signature to match Next.js App Router expectations
export async function POST(
    request: Request | NextRequest
): Promise<Response | NextResponse> {
    try {
        const reqData = await request.json();

        if (!reqData.productId) {
            return NextResponse.json({ message: "productId is required" }, { status: 400 });
        }

        if (!reqData.userId) {
            return NextResponse.json({ message: "userId is required" }, { status: 400 });
        }

        const response = await lemonSqueezyApiInstance.post("/checkouts", {
            data: {
                type: "checkouts",
                attributes: {
                    checkout_data: {
                        custom: {
                            user_id: reqData.userId.toString()
                        }
                    }
                },
                relationships: {
                    store: {
                        data: {
                            type: "stores",
                            id: process.env.LEMONSQUEEZY_STORE_ID?.toString()
                        }
                    },
                    variant: {
                        data: {
                            type: "variants",
                            id: reqData.productId.toString()
                        }
                    }
                }
            }
        });
        console.log(response.data);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
    }
}