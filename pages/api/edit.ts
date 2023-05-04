import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const client = await connectDB;
        const db = await client.db(process.env.DB_NAME);
        const { _id, title, content } = req.body;

        const result = await db
            .collection(process.env.DB_COLLECTION_NAME)
            .updateOne({ _id: new ObjectId(_id) }, { $set: { title, content } });

        res.redirect(302, "/list");
    }

    if (req.method === "DELETE") {
        const client = await connectDB;
        const db = await client.db(process.env.DB_NAME);

        await db
            .collection(process.env.DB_COLLECTION_NAME)
            .deleteOne({ _id: new ObjectId(req.body) });

        const result = await db
            .collection(process.env.DB_COLLECTION_NAME)
            .find()
            .toArray();

        return res.status(200).json(result);
    }
}
