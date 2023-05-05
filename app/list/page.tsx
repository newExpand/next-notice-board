import React, { use } from "react";
import { connectDB } from "@/util/database";
import ListItem from "./ListItem";

/* 
빌드시 강제로 다이나믹 렌더링으로 보여주는 방법 

코드예시
export const dynamic = "force-static";

설명
html을 매번 다시 그려서 보내줌
*/

/* 
빌드시 

GET요청결과 캐싱 revalidate

코드예시
fetch('/URL', { cache: 'force-cache' })
fetch('/URL', { next: { revalidate: 60 } }) 
fetch('/URL', { cache: 'no-store' })

페이지단위 캐싱

코드예시
export const revalidate = 60;

추가 설명
=> export const revalidate = 1 // 1은 캐시 유지 시간을 뜻함;
*/

const List = async () => {
    const db = (await connectDB).db(process.env.DB_NAME);
    let result = await db.collection(process.env.DB_COLLECTION_NAME).find().toArray();

    return (
        <div className="list-bg">
            <ListItem dbResult={result} />
        </div>
    );
};

export default List;
