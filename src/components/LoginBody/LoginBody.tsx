import React, { useContext, useState } from "react";
import { Panel_container, Panel, Layout_Notch, Spacer } from "../BodyElements/BodyElements";
import NavBar from "../NavBar/NavBar";
import "./LoginBody.scss";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../PageContainer/Container";
import { TextField, InputAdornment, OutlinedInput, IconButton, Button } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";


function LoginBody () {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const {dispatch} = useContext(AuthContext); 

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const navigate = useNavigate();
    const navigateToDriver = () => {
        navigate('/driver');
    };
    const navigateToPassenger = () => {
        navigate('/passenger');
    };

    function loginHandler(e){
        const userData = {
            username: username,
            password: password
        };

        axios.get("/api/user", { params: userData }).then(({data}) => {
            // save first name in session storage for profile icon
            sessionStorage.setItem("firstName", data?.firstName);

            // if the login is successful save the role and passenger or driver of user in session storage
            axios.get(`/api/${data?.role}`, { params: {userID: data?._id["$oid"]} }).then((response) => {
                sessionStorage.setItem("role", data?.role);
                sessionStorage.setItem("id", response.data[0]?._id["$oid"]);
                dispatch({role: data?.role, id: response.data[0]?._id["$oid"]});
            }).catch(({response}) => {
                if (response) {
                    console.log(response)
                    console.log(response.status)
                    console.log(response.headers)
                }
            });

            if (data?.role == "driver") {
                navigateToDriver();
            }
            else if (data?.role == "passenger") {
                navigateToPassenger();
            }
        }).catch(({response}) => {
            if (response.status == 401) {
                document.getElementById("form-message").textContent = response.data
            }
        });
    
        e.preventDefault()

    }

    const [showPassword, setShowPassword] = React.useState(false);
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return(
        <div>
            <NavBar toggle={toggle}></NavBar>
            <Container>
                <Panel_container>
                    <Panel>
                        <Layout_Notch>
                            <form id="login-form" onSubmit={loginHandler}>
                                <div id="login-div">
                                    <div id="heading-div">
                                        <h1 id="login-heading" tabIndex={0}>Login</h1>
                                    </div>
                                    <Spacer></Spacer>
                                    <div id="login-logo">
                                        <img 
                                            id="login-img"
                                            src={require('../../images/logo.PNG').default}
                                            className="img-thumbnail"
                                            alt="scoop-logo"
                                            role="img"
                                            tabIndex={-1}
                                        />
                                    </div>
                                    <Spacer></Spacer>
                                    <TextField type="text" name="username" className="form-control" id="username-form" placeholder="Username" fullWidth={true} onChange={({ target }) => setUsername(target.value)} required></TextField>

                                    <Spacer></Spacer>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        fullWidth={true}
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
                                        onChange={({ target }) => setPassword(target.value)}
                                        required
                                    />
                                    <p id="form-message"></p>
                                    <Button type="submit" tabIndex={0} variant="contained" id="complete-login" onClick={loginHandler} fullWidth={true}>Login</Button>
                                    <Spacer></Spacer>
                                    <div className="d-flex flex-row justify-content-center mb-4" id="RegistrationText">
                                        <p id="registration-para" tabIndex={0}>Dont have an account? <Link to="/signup" tabIndex={0}>Register here</Link></p>
                                    </div>
                                </div>
                            </form>
                        </Layout_Notch>
                    </Panel>
                </Panel_container>
            </Container>
        </div>
    );
}

export default LoginBody;