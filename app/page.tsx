import { connectDB } from "@/util/database";

export default async function Home() {
    const db = (await connectDB).db(process.env.DB_NAME);
    let result = await db.collection(process.env.DB_COLLECTION_NAME).find().toArray();

    return <div>{result[0].content}</div>;
}
