import React, { useContext, useState, useEffect } from "react";
import {Banner, BannerText, BtnLink, BannerImage} from './HomeElements';
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
    const {state} = useContext(AuthContext);
    const [disabled, setDisabled] = useState(false);
    let userRole = state?.role;

    useEffect(() => {
        const roleFromStorage = localStorage.getItem('role');
        if (userRole || roleFromStorage) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [userRole]);

    return(
        <div>
            <Banner>
                <BannerText>
                    <h1 tabIndex={0}>Going Somewhere?</h1>
                    <h2 style={{fontWeight: 200, marginBottom: 20}} tabIndex={0}>Pick someone up with Scoop.</h2>
                    <BtnLink to="/login" tabIndex={0} disabled={disabled}>Log In</BtnLink>
                </BannerText>
                <BannerImage tabIndex={0}>
                    <img src={require('../../images/banner.jpg').default} alt="Welcome Page Banner" />
                </BannerImage>
            </Banner>
        </div>
    )
}

export default Home;