import { connectDB } from "@/util/database";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const db = (await connectDB).db(process.env.DB_NAME);
    let result = await db.collection(process.env.DB_COLLECTION_NAME).find().toArray();

    return NextResponse.json(result);
}
