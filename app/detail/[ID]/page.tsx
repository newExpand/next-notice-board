import React from "react";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";
import { notFound } from "next/navigation";

interface DetailProps {
    params?: {
        ID?: string;
    };
    searchParams?: {
        search?: string;
    };
}

const Detail = async ({ params }: DetailProps) => {
    // if (result == undefined || null) {
    //     return notFound();
    // }

    try {
        const db = (await connectDB).db(process.env.DB_NAME);
        let result = await db.collection(process.env.DB_COLLECTION_NAME).findOne({
            _id: new ObjectId(params?.ID),
        });

        return (
            <div>
                <h4>상세페이지</h4>
                <h4>{result.title}</h4>
                <p>{result.content}</p>
                <Comment parentPageId={result._id.toString()} />
            </div>
        );
    } catch (err) {
        return notFound();
    }
};

export default Detail;
