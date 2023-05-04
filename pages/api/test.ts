import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await connectDB;
    const db = await client.db(process.env.DB_NAME);

    const result = await db.collection(process.env.DB_COLLECTION_NAME).find().toArray();

    return res.status(200).json(result);
    if (req.method === "GET") {
    }
}
