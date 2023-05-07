import React from "react";
import { connectDB } from "@/util/database";

const Register = async () => {
    return (
        <form action="/api/register" method="POST">
            <input type="text" name="name" placeholder="이름" required />
            <input type="email" name="email" placeholder="이메일" required />
            <input type="password" name="password" placeholder="비번" required />
            <button type="submit">회원가입</button>
        </form>
    );
};

export default Register;
