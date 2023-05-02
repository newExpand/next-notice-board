"use client";

import { useRouter } from "next/navigation";
import React from "react";

const DetailLink = () => {
    const router = useRouter();

    /*
        📌 useRouter 기능 정리
        client component 일때만 사용 가능
        
        1. router.push("/주소") => 페이지이동
        2. router.back() => 뒤로가기
        3. router.forward() => 앞으로가기
        4. router.refresh() => 이전과 바뀐점을 분석해서 바뀐부분만 새로고침(soft refresh)
        5. router.prefetch('/주소') => 주소 내용을 미리 로드
            - 페이지 방문할 때 매우 빠르게
            - server component의 Link 태그 default 기능임(멈추고 싶으면 prefetch={false} 옵션 주면 됨)
        
        usePathname => 현재 URL 출력

        useSearchParams => search parameter (query string) 출력

        useParams => [dynamic route]에 입력한내용 (URL 파라미터) 을 출력
    */

    return (
        <button type="button" onClick={() => {}}>
            버튼
        </button>
    );
};

export default DetailLink;
