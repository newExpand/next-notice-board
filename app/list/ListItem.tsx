"use client";

import React, { useState, useEffect } from "react";
import { PostType } from "@/util/database";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ListItemProps {
    dbResult: [];
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
            console.log("asd");
            setDbData(data);
        }, 1000);
    };

    useEffect(() => {
        fetch("/api/test", {
            method: "GET",
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setDbData(res);
            });
    }, [setDbData]);

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
