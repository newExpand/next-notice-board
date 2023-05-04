import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const client = await connectDB;
        const db = await client.db(process.env.DB_NAME);

        const deleteDB = await db
            .collection(process.env.DB_COLLECTION_NAME)
            .deleteOne({ _id: new ObjectId(req.body) });

        const result = await db
            .collection(process.env.DB_COLLECTION_NAME)
            .find()
            .toArray();

        return res.status(200).json(result);
        // res.status(200).json("삭제 완료");
    }
}
