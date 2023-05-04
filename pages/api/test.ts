import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("쿼리 :", req.query);

    return res.status(200).json("");
}
