import React from "react";
import { connectDB } from "@/util/database";

const Register = async () => {
    return (
        <form action="/api/register" method="POST">
            <input type="email" name="email" required />
            <input type="password" name="password" required />
            <button type="submit">회원가입</button>
        </form>
    );
};

export default Register;
