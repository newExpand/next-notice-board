"use client"; // 무조건 선언해 줘야함

import React from "react";

interface ErrorType {
    error?: Error;
    reset?: () => void;
}

const Error = ({ error, reset }: ErrorType) => {
    return <h1>에러남!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h1>;
};

export default Error;
