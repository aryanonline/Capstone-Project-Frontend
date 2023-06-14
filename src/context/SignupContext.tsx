import React from "react";
import { createContext, Dispatch, FC, ReactNode, useReducer } from "react";

type carDetails = {
    carMake: string;
    carModel: string;
    carYear: number;
    licencePlate: string;
    maxRadius: number;
    availableSeats: number;
};

type signupForm =  {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    birthday: string;
    role: string;
    // driver props
    quizVisability: boolean;
    isModuleComplete?: boolean;
    vehicle?: Partial<carDetails>; 
    // passenger props
    visualImpairment?: boolean;
    hearingImpairment?: boolean;
    motorImpairment?: boolean;
};

const INITAL_STATE: signupForm = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    birthday: "",
    role: "",
    quizVisability: false,
    isModuleComplete: false,
    vehicle:{
        carMake: '',
        carModel: '',
        carYear: undefined,
        licencePlate: '',
        maxRadius: undefined,
        availableSeats: undefined,
    },
    visualImpairment: false,
    hearingImpairment: false,
    motorImpairment: false
};

type signupContextType = {
    state: signupForm
    dispatch: Dispatch<Partial<signupForm>>
};

const signupReducer = (state: signupForm, action: Partial<signupForm>) => {
    return {...state, ...action};
};

export const SignupContext = createContext<signupContextType>({
    state: INITAL_STATE,
    dispatch: () => null
});

type Props = {
    children: ReactNode;
};

export const SignupContextProvider: FC<Props> = (({ children }) => {
    const [state, dispatch] = useReducer(signupReducer, INITAL_STATE);
     
    return (
        <SignupContext.Provider value={{state, dispatch}}>
            {children}
        </SignupContext.Provider>
    );
});
