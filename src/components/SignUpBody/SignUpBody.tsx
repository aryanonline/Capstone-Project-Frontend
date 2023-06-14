import React, { useContext, useState } from "react";
import { Panel_container, Panel, Layout_Notch, Spacer } from "../BodyElements/BodyElements";
import { Container } from "../PageContainer/Container";
import NavBar from "../NavBar/NavBar";
import "./SignUpBody.scss";
import { useNavigate } from "react-router-dom";
import { TextField, InputAdornment, OutlinedInput, IconButton, Button } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import { SignupContext } from "../../context/SignupContext";
import { AuthContext } from "../../context/AuthContext";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MuiTelInput } from "mui-tel-input";
import dayjs, { Dayjs } from 'dayjs';

const SignUpBody = () => {
    const {state, dispatch} = useContext(SignupContext);
    const {dispatch: authDispatch} = useContext(AuthContext);
    
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const handleChange = ({target}) => {
        const value = target.value;
        dispatch({[target.name]: value});
    };

    const handleCarChange = ({target}) => {
        dispatch({vehicle: {...state?.vehicle, [target.name]: target.value}});
    };

    /**
     * 
     * @param e - event
     * 
     * Start by creating a user, when the user is created either create a driver or passenger based on user role selection
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            username: state?.username,
            password: state?.password,
            firstName: state?.firstName,
            lastName: state?.lastName,
            email: state?.email,
            phoneNumber: state?.phoneNumber,
            birthday: state?.birthday,
            role: state?.role,
            acceptedRides: [],
            pastRides: []
        };
        axios.post("/api/user", userData).then((response) => {
            if (state.role == "passenger") {
                let impairments = []
                if (state?.hearingImpairment) {
                    impairments.push("auditory");
                } 
                if (state?.visualImpairment) {
                    impairments.push("visual");
                } 
                if (state?.motorImpairment) {
                    impairments.push("motor");
                } 

                let passenger_data = {
                    userID: response.data[0]?._id["$oid"],
                };

                passenger_data["impairments"] = impairments;

                axios.post("/api/passenger", passenger_data).then(({data}) => {
                    sessionStorage.setItem("id", data[0]?._id["$oid"]);
                    sessionStorage.setItem("role", "passenger");
                    authDispatch({role: "passenger", id: data[0]?._id["$oid"]});
                    navigateToPassenger();
                }).catch((error) => {
                    if (error.response) {
                        console.log(error.response)
                        console.log(error.response.status)
                        console.log(error.response.headers)
                    }
                });
            } 
            else if (state.role == "driver") {
                const driver_data = {
                    userID: response.data[0]?._id["$oid"],
                    vehicle: {
                        make: state?.vehicle?.carMake,
                        model: state?.vehicle?.carModel,
                        year: +state?.vehicle?.carYear,
                        licencePlate: state?.vehicle?.licencePlate
                    },
                    maxRadius: +state?.vehicle?.maxRadius,
                    isModuleComplete: state?.isModuleComplete
                };
                axios.post("/api/driver", driver_data).then(({data}) => {
                    sessionStorage.setItem("id", data[0]?._id["$oid"]);
                    sessionStorage.setItem("role", "driver");
                    authDispatch({role: "driver", id: data[0]?._id["$oid"]});
                    navigateToDriver();
                }).catch((error) => {
                    if (error.response) {
                        console.log(error.response)
                        console.log(error.response.status)
                        console.log(error.response.headers)
                    }
                });
            }
            sessionStorage.setItem("role", response.data?.role);
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        });
    };

    const [isOpen, setIsOpen] = useState(false);
    const now = new Date();
    const [date, setDate] = React.useState<Dayjs | null>(null);

    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/login')
    };
    const navigateToDriver = () => {
        navigate('/driver');
    };
    const navigateToPassenger = () => {
        navigate('/passenger');
    };
    
    function nextView () {
        if (state.role == "passenger") {
            document.getElementById("main-body").style.display="none";
            document.getElementById("signup-body").style.display="block"
        } else {
            // check if all the car details are filled out
            const car = state?.vehicle;
            let currDate = new Date();
            let currentYear = currDate.getFullYear();

            if(car?.carMake != '' &&  car?.carModel != '' && car?.carYear != undefined && +car?.carYear <= currentYear + 1 && +car?.maxRadius != undefined && +car?.maxRadius >= 0.5 && +car?.availableSeats != undefined && +car?.availableSeats > 0) {
                document.getElementById("driver-body").style.display="none";
                document.getElementById("signup-body").style.display="block"
            } else {
                alert("Missing Fields or Invalid Values");
            }
        }
    }
   
    function GoBack(name){
        if(name == "PassengerBack") {
            document.getElementById("signup-body").style.display = "none";
            document.getElementById("main-body").style.display="block";
        }
        else if (name == "DriverBack") {
            document.getElementById("signup-body").style.display = "none";
            document.getElementById("driver-body").style.display="block";
            
        } 
        else if (name == "CarBack") {
            document.getElementById("driver-body").style.display="none";
            document.getElementById("main-body").style.display="block";
        }
    }

    function RoleHandler(num){
        // check if all the fields are first filled
        if(state.firstName != '' && state.lastName != '' && state.email != '' && state.email.includes('@') && state.phoneNumber.length == 15 && state.birthday != ''){
            if(num == 0){
                dispatch({role: "passenger"});
                document.getElementById("disabilities-div").style.display="block";
            }
            else{
                dispatch({role: "driver"});
                document.getElementById("main-body").style.display = "none";
                document.getElementById("driver-body").style.display = "block";
            }
        } else {
            alert('Missing/Invalid Fields');
        }
    };

    function handleToggle(value){
        document.getElementById("toggled-block").style.display = "block";
        document.getElementById("backToLogin-btn").style.display="none";
        if(value == 1){
            document.getElementById("impairments-checkbox").style.display="block";
        }
        else {
            dispatch({hearingImpairment: false, visualImpairment: false, motorImpairment: false});
            document.getElementById("impairments-checkbox").style.display="none";
        }
    }
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleDateChange = (newDate: Dayjs | null) => {
        
        let formattedDate = newDate.format('YYYY-MM-DD');
        dispatch({birthday: formattedDate});
        
        setDate(newDate);
        console.log(formattedDate);

    };

    return(
        <>
            <NavBar toggle={toggle}></NavBar>
            <div style={{"display": state.quizVisability ? 'none' : 'block'}}>
                <Container>
                    <Panel_container>
                        <Panel>
                            <Layout_Notch>
                                <form id="registration-form" method="post" onSubmit={handleSubmit}>
                                    <div id="registration-div">
                                        <div id="registration-heading-div">
                                            <h1 id="registration-heading" tabIndex={0}>Sign Up</h1>
                                        </div>
                                        <Spacer></Spacer>
                                        <div id="driver-body">
                                            <h3 id="car-info" tabIndex={0}>Car Info</h3>
                                            <TextField type="text" placeholder="Car Make" value={state?.vehicle?.carMake} name="carMake" id="make-form" onChange={handleCarChange} fullWidth={true} required={state.role == "driver" ? true : false}></TextField>
                                            <br></br>
                                            <br></br>
                                            <TextField type="text" placeholder="Car Model" value={state?.vehicle?.carModel} name="carModel" id="model-form" onChange={handleCarChange} fullWidth={true} required={state.role == "driver" ? true : false}></TextField>
                                            <br></br>
                                            <br></br>
                                            <TextField type="number" placeholder="Car Year" value={state?.vehicle?.carYear} name="carYear" id="Year-form" onChange={handleCarChange} InputProps={{ inputProps: { min: 0} }} fullWidth={true} required={state.role == "driver" ? true : false}></TextField>
                                            <br></br>
                                            <br></br>
                                            <TextField type="text" placeholder="License Plate Number" value={state?.vehicle?.licencePlate} name="licencePlate" id="LicenseNumber-form" onChange={handleCarChange} fullWidth={true} required={state.role == "driver" ? true : false}></TextField>
                                            <br></br>
                                            <br></br>
                                            <TextField type="number" placeholder="Max Radius" value={state?.vehicle?.maxRadius} name="maxRadius" id="MaxRadius-form" onChange={handleCarChange} fullWidth={true} required={state.role == "driver" ? true : false}></TextField>
                                            <br></br>
                                            <br></br>
                                            <TextField type="number" placeholder="Available Seats" value={state?.vehicle?.availableSeats} name="availableSeats" id="AvailableSeats-form" onChange={handleCarChange} fullWidth={true} required={state.role == "driver" ? true : false}></TextField>
                                            <Spacer></Spacer>
                                            <div id="driver-para">
                                                <p id="heading-para" tabIndex={0}><strong>Optional: Volunteer Opportunity</strong></p>
                                                <br></br>
                                                <p tabIndex={0}>
                                                    Do you want to want volunteer to help the 
                                                    help the elderly/disabled? If yes, Scoop has the
                                                    opportunity for you. By choosing this option, you can
                                                    become a volunteer and give rides to the elderly disabled.
                                                    But first, we have to check your eligibility.
                                                </p>
                                                <br></br>
                                                <p className='mb-3' tabIndex={0}>
                                                    Click the button below to play 
                                                    a short game to test your 
                                                    eligibility
                                                </p>
                                                <br></br>
                                                <p className='mb-3' tabIndex={0}>
                                                    This test is always available under settings
                                                </p>
                                                <Button variant="contained" type="button" id="play-btn" onClick={() => dispatch({quizVisability: true})}>Play Game</Button>
                                                <br></br>
                                                <br></br>
                                            </div>
                                            <Spacer></Spacer>
                                            <div className="btn-container">
                                                <Button variant="contained" type="button" id="Back-btn" onClick={() => GoBack('CarBack')}>Back</Button>
                                                <Button variant="contained" type="button" id="Next-btn" onClick={nextView}>Next</Button>
                                            </div>
                                        </div>
                                        <div id="signup-body">
                                            <h3 id="account-info"></h3>
                                            <TextField placeholder="Username" name="username" id='user-form' type='text' onChange={handleChange} fullWidth={true} required></TextField>
                                            <br></br>
                                            <br></br>
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                onChange={handleChange}
                                                fullWidth={true}
                                                inputProps={{pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", min: 8}}
                                                endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                                }
                                                placeholder="Password"
                                            />
                                            <Spacer></Spacer>
                                            <div className="btn-container">
                                                <Button variant="contained" type="button" id="Back-btn" onClick={() => state.role == "passenger" ? GoBack('PassengerBack') : GoBack("DriverBack")}>Back</Button>
                                                <Button type="submit" name="submit" id="complete-btn">Sign Up</Button>
                                            </div>
                                            
                                        </div>
                                        <div id="main-body">
                                            <h3 id="personal-info" tabIndex={0}>Personal Info</h3>
                                            <TextField placeholder="First Name" id="fname-form" type="text" name="firstName" value={state.firstName} onChange={handleChange} fullWidth={true} required></TextField>
                                            <br></br>
                                            <br></br>
                                            <TextField placeholder="Last Name" id="lname-form" type="text" name="lastName" value={state.lastName} onChange={handleChange} fullWidth={true} required></TextField>
                                            <br></br>
                                            <br></br>
                                            <TextField placeholder="Email Address" id='email-form' type='email' name="email" value={state.email} onChange={handleChange} fullWidth={true} required></TextField>
                                            <br></br>
                                            <br></br>
                                            <MuiTelInput placeholder="Phone Number" id='telephone-form' defaultCountry="CA" name="phoneNumber" value={state.phoneNumber} inputProps={{ maxLength: 15 }} onChange={(num) => {dispatch({phoneNumber: num})}} fullWidth={true} required></MuiTelInput>
                                            <br></br>
                                            <br></br>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                    label="Birthday"
                                                    inputFormat="MM/DD/YYYY"
                                                    value={date} //Date()
                                                    views={['year', 'month', 'day']}
                                                    maxDate={dayjs().subtract(18, 'year')} //dayjs()
                                                    onChange={handleDateChange}
                                                    renderInput={(params) => <TextField {...params} fullWidth/>}
                                                />
                                            </LocalizationProvider>
                                            
                                            <Spacer></Spacer>
                                            <h3 id="role" tabIndex={0}>Role</h3>
                                            <div className="btn-container">
                                                <Button variant="contained" type="button" id="passenger-btn"  onClick={() => RoleHandler(0)}>Passenger</Button>
                                                <Button variant="contained" type="button" id="driver-btn" onClick={() => RoleHandler(1)}>Driver</Button>
                                            </div>
                                            <br></br>
                                            <div id="disabilities-div">
                                                <h3 id="disabilities-info" tabIndex={0}>Disabilities</h3>
                                                <label id="descriptionLabel" tabIndex={0}>Do you have any Impairments</label>
                                                <input name="disability" type="radio" value="yes" id="yes-radio" tabIndex={0} onClick={() => handleToggle(1)}></input>
                                                <label htmlFor="yes-radio">Yes</label>
                                                <input name="disability" type="radio" value="no" id="no-radio" tabIndex={0} onClick={() => handleToggle(0)}></input>
                                                <label htmlFor="no-radio">No</label><br></br>
                                            </div>
                                            <Spacer></Spacer>
                                            <Button id="backToLogin-btn" type="button" onClick={navigateToLogin}>Back To Login</Button>
                                            <div id="impairments-checkbox">
                                                <input type="checkbox" id="Visual" name="visual impairments" value="visual" tabIndex={0} onClick={() => dispatch({visualImpairment: !state?.visualImpairment})}/>
                                                <label htmlFor="Visual">Visual Impairments</label><br></br>
                                                <input type="checkbox" id="Hearing" name="Hearing impairments" value="hearing" tabIndex={0} onClick={() => dispatch({hearingImpairment: !state?.hearingImpairment})}/>
                                                <label htmlFor="visual">Hearing Impairments</label><br></br>
                                                <input type="checkbox" id="Motor" name="Motor impairments" value="motor" tabIndex={0} onClick={() => dispatch({motorImpairment: !state?.motorImpairment})}/>
                                                <label htmlFor="Motor">Motor function Impairments</label>
                                                <Spacer></Spacer>
                                            </div>
                                            <div id="toggled-block">
                                                <div className="btn-container">
                                                    <Button variant="contained" type="button" id="backToLogin-btn-small" onClick={navigateToLogin}>Back To Login</Button>
                                                    <Button variant="contained" type="button" id="Next-btn" onClick={nextView}>Next</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </Layout_Notch>
                        </Panel>
                    </Panel_container>
                </Container>
            </div>
        </>
    );
};

export default SignUpBody;