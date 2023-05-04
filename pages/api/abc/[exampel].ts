import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("안녕");
    console.log(req.query);
    return res.status(200).json("");
}
