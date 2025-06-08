import React from 'react'
import { createContext, useState, useContext } from 'react'

const UserContext = createContext();

// children is any component that will need to access the details of user context
export function UserProvider({children}) {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
    }

    const logout = () => {
        setUser(null);
    }

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );

}

