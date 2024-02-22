import { useState } from 'react';
import React from 'react';

const AuthContext = React.createContext({
    user_id: null,
    logIn: (user_id) => {},
    logOut: () => {}
});

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState(localStorage.getItem('user_id'));

    const logIn = (user_id) => {
        setUser(user_id);
        localStorage.setItem('user_id', user_id);
    }

    const logOut = () => {
        setUser(null);
        localStorage.removeItem('user_id');
    }
    
    const authContext = {
        user_id: user,
        logIn: logIn,
        logOut: logOut
    }

    return (
        <AuthContext.Provider
            value={authContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;