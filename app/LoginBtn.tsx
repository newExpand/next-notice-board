"use client";

import React from "react";
import { signIn } from "next-auth/react";

const LoginBtn = () => {
    return <button onClick={() => signIn()}>로그인</button>;
};

export default LoginBtn;
