import React from "react";
import { connectDB } from "@/util/database";
import { PostType } from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";

const List = async () => {
    const db = (await connectDB).db(process.env.DB_NAME);
    let result = await db.collection(process.env.DB_COLLECTION_NAME).find().toArray();

    console.log(result);
    return (
        <div className="list-bg">
            {result.map((item: PostType) => (
                <div className="list-item" key={item._id}>
                    <Link href={`/detail/${item._id}`}>
                        <h4>{item.title}</h4>
                    </Link>
                    <Link href={`/edit/${item._id}`}>✍ 수정</Link>
                    <p>{item.content}</p>
                </div>
            ))}
        </div>
    );
};

export default List;
