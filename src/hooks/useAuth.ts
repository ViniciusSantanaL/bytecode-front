import {useEffect, useState} from "react";
import {TokenDTO} from "../service/Auth/TokenDTO";
import {http} from "../service/api";

export function useAuth() {
    const APP_TOKEN_KEY: string = '@ByteCode:Token'
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [token, setToken] = useState<TokenDTO | null>(null)

    useEffect(() => {
        const userToken = localStorage.getItem(APP_TOKEN_KEY)

        if (userToken) {
            const dataToken = JSON.parse(userToken) as TokenDTO
            setToken(dataToken)
        }

        setIsLoading(false)
    }, [])

    const handleLogin = async (username: string, password: string) => {
        const result = await http
            .post("auth", { userName: username, password: password })
            .then((response) => {
                return response
            })
            .catch((err) => {return err.response.data});

        const {data, status} = result

        if (status !== undefined && status === 200) {
            const userToken = data as TokenDTO
            setToken(userToken)
            localStorage.setItem(APP_TOKEN_KEY, JSON.stringify(userToken))
        }

        return result
    }
    return {isLoading, token, handleLogin}
}