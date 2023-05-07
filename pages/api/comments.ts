import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const session = await getServerSession(req, res, authOptions);
        const { content, parent } = JSON.parse(req.body);
        const data = {
            content,
            author: session?.user?.email,
            parent: new ObjectId(parent),
        };
        const client = await connectDB;
        const db = await client.db(process.env.DB_NAME);

        await db.collection(process.env.DB_COLLECTION_NAME_COMMENT).insertOne(data);

        const result = await db
            .collection(process.env.DB_COLLECTION_NAME_COMMENT)
            .find({ parent: new ObjectId(parent) })
            .toArray();

        res.status(200).json(result);
    }

    if (req.method === "GET") {
        const id = req.query.id;

        const client = await connectDB;
        const db = await client.db(process.env.DB_NAME);

        console.log(req.body);

        const result = await db
            .collection(process.env.DB_COLLECTION_NAME_COMMENT)
            .find({ parent: new ObjectId(id as string) })
            .toArray();

        res.status(200).json(result);
    }
}
