import React from "react";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

interface EditProps {
    params?: {
        ID?: string;
    };
}

const Edit = async ({ params }: EditProps) => {
    const client = await connectDB;
    const db = await client.db(process.env.DB_NAME);
    const { title, content, _id } = await db
        .collection(process.env.DB_COLLECTION_NAME)
        .findOne({
            _id: new ObjectId(params?.ID),
        });

    console.log(title);

    return (
        <form action="/api/edit" method="POST">
            <input type="text" name="title" defaultValue={title} />
            <input name="content" defaultValue={content} />
            <input name="_id" type="hidden" defaultValue={_id.toString()} />
            <button type="submit">수정하기</button>
        </form>
    );
};

export default Edit;
