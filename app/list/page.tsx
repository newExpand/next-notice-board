import React from "react";
import { connectDB } from "@/util/database";
import ListItem from "./ListItem";

const List = async () => {
    const db = (await connectDB).db(process.env.DB_NAME);
    let result = await db.collection(process.env.DB_COLLECTION_NAME).find().toArray();

    console.log(result);
    return (
        <div className="list-bg">
            <ListItem dbResult={result} />
        </div>
    );
};

export default List;
