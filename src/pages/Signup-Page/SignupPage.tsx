import { useNavigate } from "react-router-dom";
import React from "react";
import SignUpBody from "../../components/SignUpBody/SignUpBody";
import { SignupContextProvider } from "../../context/SignupContext";
import DriverGame from "../../pages/Driver-Game/DriverGame";


function GoBack(name){
    if(name == "DriverBack"){
        document.getElementById("driver-body").style.display="none";
        document.getElementById("main-body").style.display="block";
    }
    else if(name == "PassengerBack"){
        document.getElementById("passenger-body").style.display = "none";
        document.getElementById("main-body").style.display="block";
    }
}

const handlePassenger = () => {
    return(
        document.getElementById("untoggled-block").style.display="none",
        document.getElementById("test-div").style.display="block"
    );
}
function handleToggle(value){
    if(value == 1){
        document.getElementById("toggled-block").style.display = "block";
    }
    else{
        document.getElementById("toggled-block").style.display= "none";
    }
}
const handleDriver = () => {
    return(
        document.getElementById("untoggled-block").style.display="block",
        document.getElementById("toggled-block").style.display="none",
        document.getElementById("test-div").style.display="none",
        document.getElementById("main-body").style.display="none",
        document.getElementById("driver-body").style.display="block"

    );
}
const nextView = () => {
    return(
        document.getElementById("main-body").style.display="none",
        document.getElementById("passenger-body").style.display="block"
    );
}

function SignupPage() {
    const navigate = useNavigate();
    const navigateToLogin = () => {
         navigate('/login')
    };
    const navigateToDriver = () => {
        navigate('/driver/accept-deny');
   };
    return(
        <SignupContextProvider>
            <SignUpBody />
            <DriverGame />
        </SignupContextProvider>
    );
}

export default SignupPage;