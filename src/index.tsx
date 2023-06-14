import React from "react";
import ReactDOM from "react-dom";
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/Welcome-Page/WelcomePage";
import LoginPage from "./pages/Login-Page/LoginPage";
import SignupPage from "./pages/Signup-Page/SignupPage";
import DriverPage from "./pages/DriversPage/DriverPage"
import './index.css'
import PassengerPage from "./pages/Passenger-Page/PassengerPage";
import PassengersAcceptDenyPage from "./pages/Passengers-Accept-Deny-Page/PassengersAcceptDenyPage";
import DriversAcceptDenyPage from "./pages/Drivers-Accept-Deny-Page/DriversAcceptDenyPage";
import { AuthContextProvider } from "./context/AuthContext";
import DriverAcceptedRidesPage from "./pages/Driver-Accepted-Rides-Page/DriverAcceptedRidesPage";
import ProfileDetailsPage from "./pages/Profile-Details-Page/ProfileDetailsPage";
import PassengerAcceptedRidesPage from "./pages/Passenger-Accepted-Rides-Page/PassengerAcceptedRidesPage";

import AddressSearch from "./components/AddressPicker/AddressSearch"

ReactDOM.render(
    <React.StrictMode>
        <AuthContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<WelcomePage/>} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/signup' element={<SignupPage />} />
                    {/* TODO: make the following routes protected routes */}
                    <Route path='/driver' element={<DriverPage />} />
                    <Route path='/passenger' element={<PassengerPage />} />
                    <Route path='/addresspicker' element={<AddressSearch />} />
                    <Route path='/passenger/accept-deny' element={<PassengersAcceptDenyPage />} />
                    <Route path='/passenger/accepted-rides' element={<PassengerAcceptedRidesPage />} />
                    <Route path='/driver/accept-deny' element={<DriversAcceptDenyPage />} />
                    <Route path='/driver/accepted-rides' element={<DriverAcceptedRidesPage />} />
                    <Route path='/profile-details' element={<ProfileDetailsPage />} />                    
                </Routes>
            </BrowserRouter>
        </AuthContextProvider>
    </React.StrictMode>
    , document.getElementById("root"));