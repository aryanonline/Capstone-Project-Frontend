import React, { useState, useEffect, useContext } from "react";
import "./ProfileDetailsPage.scss";
import NavBar from "../../components/NavBar/NavBar";
import PersonalInfo from "../../components/PersonalInfo/PersonalInfo";
import axios from "axios";
import { SignupContext, SignupContextProvider } from "../../context/SignupContext";
import DriverGame from "../../pages/Driver-Game/DriverGame";


const ProfileDetailsPage = () => {
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {state, dispatch} = useContext(SignupContext);

    return(
        <div>
            <NavBar toggle={toggle} />
            <div className="profile-container">
                <h1 id="profile-details-title" tabIndex={0}>My Profile</h1>
                <SignupContextProvider>
                    <PersonalInfo />
                    <DriverGame />
                </SignupContextProvider>
            </div>
        </div>
    )
}

export default ProfileDetailsPage;