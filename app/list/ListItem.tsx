"use client";

import React, { useState, useEffect } from "react";
import { PostType } from "@/util/database";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ListItemProps {
    dbResult: any;
}

const ListItem: React.FC<ListItemProps> = ({ dbResult }) => {
    const [dbData, setDbData] = useState(dbResult);

    const handleDeleteList = async (id: string, e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        const parentTarget = target.parentElement as HTMLDivElement;
        const response = await fetch("/api/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(id),
        });

        if (!response.ok) return null;

        const data = await response.json();

        // @ts-ignore
        parentTarget.style.opacity = 0;

        setTimeout(() => {
            parentTarget.style.display = "none";
            setDbData(data);
        }, 1000);

        // 쿼리스트링 하는법
        // fetch("/api/test?name=lee&age=20");

        // url 파라미터 문법 쓰는법
        // fetch("/api/abc/12");
    };

    return (
        <>
            {dbData.map((item: PostType) => (
                <div className="list-item" key={item._id.toString()}>
                    <Link href={`/detail/${item._id.toString()}`}>
                        <h4>{item.title}</h4>
                    </Link>
                    <Link href={`/edit/${item._id.toString()}`}>✍ 수정</Link>
                    <span
                        onClick={handleDeleteList.bind(null, item._id.toString())}
                        id={item._id.toString()}
                    >
                        🗑
                    </span>
                    <p>{item.content}</p>
                </div>
            ))}
        </>
    );
};

export default ListItem;
