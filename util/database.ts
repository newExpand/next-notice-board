import { MongoClient, MongoClientOptions, ObjectId } from "mongodb";

export interface PostType {
    _id: string;
    title: string;
    content: string;
}

declare global {
    var _mongo: MongoClient | undefined;
}

const url = process.env.DATABASE_URL as string;
const options = { useNewUrlParser: true } as MongoClientOptions;
let connectDB: any;

if (process.env.NODE_ENV === "development") {
    if (!global._mongo) {
        global._mongo = new MongoClient(url, options).connect() as any;
    }
    connectDB = global._mongo;
} else {
    connectDB = new MongoClient(url, options).connect();
}

export { connectDB };
