"use client";

import React, { useCallback, useEffect, useState } from "react";
import { PostType } from "@/util/database";
import Link from "next/link";

interface ListItemProps {
    dbResult: [];
}

const ListItem: React.FC<ListItemProps> = ({ dbResult }) => {
    const [dbData, setDbData] = useState(dbResult);

    const handleDeleteList = async (id: string) => {
        const response = await fetch("/api/edit", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(id),
        });

        if (!response.ok) return null;

        const data = await response.json();

        setDbData(data);
    };

    return (
        <>
            {dbData.map((item: PostType) => (
                <div className="list-item" key={item._id}>
                    <Link href={`/detail/${item._id}`}>
                        <h4>{item.title}</h4>
                    </Link>
                    <Link href={`/edit/${item._id}`}>✍ 수정</Link>
                    <span onClick={handleDeleteList.bind(null, item._id)} id={item._id}>
                        🗑
                    </span>
                    <p>{item.content}</p>
                </div>
            ))}
        </>
    );
};

export default ListItem;
