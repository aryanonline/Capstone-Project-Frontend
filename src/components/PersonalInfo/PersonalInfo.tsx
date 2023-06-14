import React, { useState, useEffect, useContext } from "react";
import "./PersonalInfo.scss";
import { AuthContext } from "../../context/AuthContext";
import { TextField, Button, Alert } from '@mui/material';
import DriverGame from "../../pages/Driver-Game/DriverGame";
import { SignupContext } from "../../context/SignupContext";
import axios from "axios";

interface DriverInfo {
    vehicle: {
        make: string;
        model: string;
        year: number;
        licencePlate: string;
        availableSeats: number;
    };
    maxRadius: string;
    isModuleComplete: boolean;
}

interface UserInfo {
    role: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: number;
}

interface PassengerInfo {
    impairments: [];
}

const capitalize = (str: string) => {
    return str && str.replace(/\b\w/g, (match) => match.toUpperCase());
}  

const PersonalInfo = () => {
    const [trainingModule, setTrainingModule] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const {state: signupState, dispatch} = useContext(SignupContext);
    const {state} = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(signupState.isModuleComplete);
        axios.put("/api/profile", null, { 
            params: { 
                userID: userID, 
                username: userInfo.username, 
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email,
                phoneNumber: userInfo.phoneNumber,
                make: driverInfo.vehicle.make,
                model: driverInfo.vehicle.model,
                year: driverInfo.vehicle.year,
                licencePlate: driverInfo.vehicle.licencePlate,
                availableSeats: driverInfo.vehicle.availableSeats,
                maxRadius: parseFloat(driverInfo.maxRadius),
                isModuleComplete: driverInfo.isModuleComplete || signupState.isModuleComplete
            } }).then(({ data }) => {
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 5000);

        }).catch(({response}) => {
            console.log(response);
            console.log(response.status);
            console.log(response.headers);
        });
    };

    const [driverInfo, setDriverInfo] = useState<DriverInfo>({
        vehicle: {
            make: '',
            model: '',
            year: 0,
            licencePlate: '',
            availableSeats: 0,
        },
        maxRadius: '',
        isModuleComplete: false,
    });

    const [userInfo, setUserInfo] = useState<UserInfo>({
        role: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phoneNumber: 0,
    });

    const [passengerInfo, setPassengerInfo] = useState<PassengerInfo>({
        impairments: [],
    });

    let userRole: string = state?.role;
    let userID: string = state?.id;

    useEffect(() => {
        if (userRole == "driver") {
            axios.get("/api/driver", { params: { driverID: userID } }).then(({data}) => {
                setDriverInfo(prevState => ({
                    ...prevState,
                    vehicle: data[0]?.vehicle,
                    maxRadius: data[0]?.maxRadius,
                    isModuleComplete: data[0]?.isModuleComplete
                }));

                axios.get("/api/user", { params: { userID: data[0]?.userID["$oid"] } }).then(({data}) => {
                    setUserInfo(prevState => ({
                        ...prevState,
                        role: data[0]?.role,
                        firstName: data[0]?.firstName,
                        lastName: data[0]?.lastName,
                        username: data[0]?.username,
                        email: data[0]?.email,
                        phoneNumber: data[0]?.phoneNumber,
                    }));
                });

            }).catch(({response}) => {
                console.log(response);
                console.log(response.status);
                console.log(response.headers);
            });

        } else if (userRole == "passenger") {
            axios.get("/api/passenger", { params: { passengerID: userID } }).then(({data}) => {
                setPassengerInfo(prevState => ({
                    ...prevState,
                    impairments: data[0]?.impairments,
                }));

                axios.get("/api/user", { params: { userID: data[0]?.userID["$oid"] } }).then(({data}) => {
                    setUserInfo(prevState => ({
                        ...prevState,
                        role: data[0]?.role,
                        firstName: data[0]?.firstName,
                        lastName: data[0]?.lastName,
                        username: data[0]?.username,
                        email: data[0]?.email,
                        phoneNumber: data[0]?.phoneNumber,
                    }));
                });

            }).catch(({response}) => {
                console.log(response);
                console.log(response.status);
                console.log(response.headers);
            });
        };
    }, [state]);

    return(
        <div style={{"display": signupState.quizVisability ? 'none' : 'block'}}>
            <form onSubmit={handleSubmit}>
                <div id="personal-info-section">
                    <h3 className="info-title" tabIndex={0}>Personal Information</h3>
                    <div id="personal-info-fields">
                        <TextField className="profile-text" label='Role' value={capitalize(userInfo.role) || 'N/A'} tabIndex={0} disabled aria-label={`Role ${capitalize(userInfo.role)}`} />
                        {userRole === 'driver' ? (
                            <TextField className="profile-text" label="Module Complete" value={driverInfo.isModuleComplete || signupState.isModuleComplete ? 'Yes' : 'No'} tabIndex={0} disabled aria-label={`Module Complete ${driverInfo.isModuleComplete ? 'Yes' : 'No'}`} />
                        ) : null}
                        <TextField className="profile-text" label="Username" value={userInfo.username || 'N/A'} onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })} tabIndex={0} aria-label={`Username ${userInfo.username || 'N/A'}`} />
                        <TextField className="profile-text" label="First Name" value={capitalize(userInfo.firstName) || 'N/A'} onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })} tabIndex={0} aria-label={`First name ${capitalize(userInfo.firstName) || 'N/A'}`} />
                        <TextField className="profile-text" label="Last Name" value={capitalize(userInfo.lastName) || 'N/A'} onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })} tabIndex={0} aria-label={`Last Name ${capitalize(userInfo.lastName) || 'N/A'}`} />
                        <TextField className="profile-text" label="Email" value={userInfo.email || 'N/A'} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} tabIndex={0} aria-label={`Email ${userInfo.email || 'N/A'}`} />
                        <TextField className="profile-text" label="Phone Number" value={userInfo.phoneNumber || 'N/A'} onChange={(e) => setUserInfo({ ...userInfo, phoneNumber: parseInt(e.target.value) })} tabIndex={0} aria-label={`Phone Number ${userInfo.phoneNumber || 'N/A'}`} />
                        {userRole === 'passenger' ? (
                            <TextField className="profile-text" label="Impairments" value={capitalize(passengerInfo.impairments.join(", ")) || 'N/A'} tabIndex={0} disabled aria-label={`Impairments ${capitalize(passengerInfo.impairments.join(", ")) || 'N/A'}`} />
                        ) : null}
                    </div>
                </div>
                <br />
                {userRole === 'driver' ? (  
                    <div id="vehicle-info-section">
                        <h3 className="info-title" tabIndex={0}>Vehicle Information</h3>
                        <div id="vehicle-info-fields">
                            <TextField className="profile-text" label="Make" value={capitalize(driverInfo.vehicle?.make) || 'N/A'} onChange={(e) => setDriverInfo({ ...driverInfo, vehicle: { ...driverInfo.vehicle, make: e.target.value } })} tabIndex={0} aria-label={`Make ${capitalize(driverInfo.vehicle?.make) || 'N/A'}`} />
                            <TextField className="profile-text" label="Model" value={capitalize(driverInfo.vehicle?.model) || 'N/A'} onChange={(e) => setDriverInfo({ ...driverInfo, vehicle: { ...driverInfo.vehicle, model: e.target.value } })} tabIndex={0} aria-label={`Model ${capitalize(driverInfo.vehicle?.model) || 'N/A'}`} />
                            <TextField className="profile-text" label="Year" value={driverInfo.vehicle?.year || 'N/A'} onChange={(e) => setDriverInfo({ ...driverInfo, vehicle: { ...driverInfo.vehicle, year: parseInt(e.target.value) } })} tabIndex={0} aria-label={`Year ${driverInfo.vehicle?.year || 'N/A'}`} />
                            <TextField className="profile-text" label="License Plate" value={driverInfo.vehicle?.licencePlate || 'N/A'} onChange={(e) => setDriverInfo({ ...driverInfo, vehicle: { ...driverInfo.vehicle, licencePlate: e.target.value } })} tabIndex={0} aria-label={`License Plate ${driverInfo.vehicle?.licencePlate || 'N/A'}`} />
                            <TextField className="profile-text" label="Available Seats" value={driverInfo.vehicle?.availableSeats || 'N/A'} onChange={(e) => setDriverInfo({ ...driverInfo, vehicle: { ...driverInfo.vehicle, availableSeats: parseInt(e.target.value) } })} tabIndex={0} aria-label={`Available Seats ${driverInfo.vehicle?.availableSeats || 'N/A'}`} />
                            <TextField className="profile-text" label="Max Radius" value={isNaN(parseInt(driverInfo.maxRadius)) ? 'N/A' : driverInfo.maxRadius} onChange={(e) => setDriverInfo({ ...driverInfo, maxRadius: e.target.value })} tabIndex={0} aria-label={`Max Radius ${isNaN(parseInt(driverInfo.maxRadius)) ? 'N/A' : driverInfo.maxRadius}`} />
                        </div>
                    </div>
                ) : null}
                <div id="btn-messages">
                    <Button type="submit" variant="contained" color="primary" id="profile-save">Save</Button>
                    {userRole === 'driver' && !driverInfo.isModuleComplete ?(
                        !signupState.isModuleComplete && (
                            <Button variant="contained" color="success" id="game-btn" onClick={() => dispatch({...signupState, quizVisability: true})} tabIndex={0}>Re-take Game</Button>
                        )
                    ) : null}
                    {showAlert && (
                        <Alert onClose={() => setShowAlert(false)} id="save-success">
                            Successfully Saved
                        </Alert>
                    )}
                </div>
            </form>
        </div>
    )
}

export default PersonalInfo;