import React from "react";
import { createContext, Dispatch, FC, ReactNode, useReducer } from "react";

type authType = {
    role: string;
    id: string;
};

const INITAL_STATE: authType = {
    role: sessionStorage.getItem("role"),
    id: sessionStorage.getItem("id")
};

type authContextType = {
    state: authType;
    dispatch: Dispatch<Partial<authType>>
};

const authReducer = (state: authType, action: Partial<authType>) => {
    return {...state, ...action};
};

export const AuthContext = createContext<authContextType>({
    state: INITAL_STATE,
    dispatch: () => null
});

type Props = {
    children: ReactNode;
};

export const AuthContextProvider: FC<Props> = (({ children }) => {
    const [state, dispatch] = useReducer(authReducer, INITAL_STATE);
     
    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
});