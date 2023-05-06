import { getServerSession } from "next-auth";
import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const session = await getServerSession(req, res, authOptions);
        const client = await connectDB;
        const db = await client.db(process.env.DB_NAME);

        const findUser = await db
            .collection(process.env.DB_COLLECTION_NAME)
            .findOne({ _id: new ObjectId(req.body) });

        if (findUser.author === session?.user?.email) {
            const deleteDB = await db
                .collection(process.env.DB_COLLECTION_NAME)
                .deleteOne({ _id: new ObjectId(req.body) });
            const result = await db
                .collection(process.env.DB_COLLECTION_NAME)
                .find()
                .toArray();
            return res.status(200).json(result);
        } else {
            return res.status(500).json("글쓴이와 작성자가 불일치 합니다.");
        }
    }
}
