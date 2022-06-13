import {createContext} from "react";
import { TokenDTO } from "../service/Auth/TokenDTO";

export type AuthContextType = {
    isLoading: boolean
    token: TokenDTO | null
    handleLogin: (username: string, password: string) => Promise<TokenDTO | void>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)
