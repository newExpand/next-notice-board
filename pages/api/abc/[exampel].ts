import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const client = await connectDB;
        const db = await client.db(process.env.DB_NAME);

        const deleteDB = await db
            .collection(process.env.DB_COLLECTION_NAME)
            .deleteOne({ _id: new ObjectId(req.query.exampel as string) });

        const result = await db
            .collection(process.env.DB_COLLECTION_NAME)
            .find()
            .toArray();

        return res.status(200).json(result);
    }
}
