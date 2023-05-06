import { getServerSession } from "next-auth";
import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        req.body.author = session.user?.email;
    }

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
