import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
    const date = new Date();

    return NextResponse.json(date);
}
