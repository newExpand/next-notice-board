import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        if (req.body.title.trim() == "") {
            return res.status(500).json("제목써라");
        }

        try {
            const db = (await connectDB).db(process.env.DB_NAME);
            db.collection(process.env.DB_COLLECTION_NAME).insertOne(req.body);
            res.redirect(302, "/list");
        } catch (err) {}
    }
}
