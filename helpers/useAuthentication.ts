import React, { useEffect } from "react";
import { parseJwt } from ".";
import { useRouter } from "next/router"
import { useGlobalState } from "../state"




/// ngăn chặn khi chưa login

function useAuthen() {
    const router = useRouter()
    const [token] = useGlobalState("token")


    useEffect(() => {
        const userToken = parseJwt(token)
        if (!(userToken && userToken.id && userToken.email)) {
            router.push("/login")
        }
        // console.log(userToken);
    }, [token])

}




/// đăng nhập xong push sang trang home

function useNotAuthen() {
    const router = useRouter()
    const [token] = useGlobalState("token")



    useEffect(() => {
        const userToken = parseJwt(token)
        if (userToken && userToken.id && userToken.email) {
            router.push("/")
        }
        console.log(userToken);

    }, [token])

}

export { useAuthen, useNotAuthen }