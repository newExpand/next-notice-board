import React from "react";
import { connectDB } from "@/util/database";
import { PostType } from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";

const List = async () => {
    const db = (await connectDB).db(process.env.DB_NAME);
    let result = await db.collection(process.env.DB_COLLECTION_NAME).find().toArray();

    return (
        <div className="list-bg">
            {result.map((item: PostType) => (
                <div className="list-item" key={item._id}>
                    <h4>{item.title}</h4>
                    <p>{item.content}</p>
                    <DetailLink />
                </div>
            ))}
        </div>
    );
};

export default List;
