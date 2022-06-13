import { AuthContext } from "../contexts"
import {useAuth} from "../hooks/useAuth";

const AuthProvider =({children}: {children: JSX.Element}) => {
    const {token, isLoading, handleLogin} = useAuth()
    const value = {isLoading, token, handleLogin}

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export {AuthProvider}