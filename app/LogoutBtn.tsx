"use client";

import React from "react";
import { signOut } from "next-auth/react";

interface LogoutBtnProps {
    name: string | null | undefined;
}

const LogoutBtn: React.FC<LogoutBtnProps> = ({ name }) => {
    return (
        <div>
            <span>{name}</span>
            <button onClick={() => signOut()}>로그아웃</button>
        </div>
    );
};

export default LogoutBtn;
