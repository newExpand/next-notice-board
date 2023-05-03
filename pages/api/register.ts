import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const client = await connectDB;
            const db = await client.db(process.env.DB_NAME);
            const { email, password } = req.body;

            const dupleEmail = await db
                .collection(process.env.DB_COLLECTION_NAME_AUTH)
                .findOne({ email });

            if (dupleEmail) {
                return res.status(400).json("회원가입실패");
            }
            await db.collection(process.env.DB_COLLECTION_NAME_AUTH).insertOne(req.body);
            return res.status(200).json("회원가입성공");
        } catch (err) {}
    }
}
