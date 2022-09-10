import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});



const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});



    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

// Hooks

export const useAuth = () => useContext(AuthContext)

export default AuthProvider