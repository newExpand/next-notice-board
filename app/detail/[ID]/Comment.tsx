"use client";

import React, { useEffect, useState } from "react";

interface CommentProps {
    parentPageId: string | undefined;
}

const Comment: React.FC<CommentProps> = ({ parentPageId }) => {
    const [comment, setComment] = useState("");
    const [commentList, setCommentList] = useState([]);

    const handleCommentChange = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;

        setComment(target.value);
    };

    const data = {
        content: comment,
        parent: parentPageId,
    };

    const handleClick = () => {
        fetch("/api/comments", { method: "POST", body: JSON.stringify(data) })
            .then((res) => res.json())
            .then((res) => {
                setCommentList(res);
                setComment("");
            });
    };

    useEffect(() => {
        fetch(`/api/comments?id=${parentPageId}`)
            .then((res) => res.json())
            .then((res) => {
                setCommentList(res);
            });
    }, [parentPageId]);

    return (
        <div>
            <hr />
            {commentList.map(
                (item: {
                    _id: string;
                    content: string;
                    author: string;
                    parent: string;
                }) => (
                    <p key={item._id}>{item.content}</p>
                )
            )}
            <div>댓글목록</div>
            <input value={comment} onChange={handleCommentChange} />
            <button onClick={handleClick}>댓글전송</button>
        </div>
    );
};

export default Comment;
