import { createContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = (props) => {
    const [auth, setAuth] = useState({
        token: window.localStorage.getItem('token'),
        firstName: window.localStorage.getItem('first_name'),
        userId: window.localStorage.getItem('user_id'),
    })

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {props.children}
        </AuthContext.Provider>
    )
}