import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ForumIcon from '@mui/icons-material/Forum';
import {ServicesContainer, Title, Features, Feature, FeaturesDesc} from './ServicesElements';

const Services = () => {
    return(
        <div id="services">
            <ServicesContainer>
                <Title>
                    <h2 style={{color: '#007a78'}} tabIndex={0}>FEATURES</h2><br />
                    <h3 style={{fontWeight: 300}} tabIndex={0}>Get started now for access to all the features</h3>
                </Title>
                <Features>
                    <Feature>
                        <AccountCircleIcon style={{width: 110, height: 110, color: '#fbbb4d'}} role="img" aria-label="Create Account Image" />
                        <FeaturesDesc>
                            <h3 style={{fontWeight: 300}} tabIndex={0} aria-label="Feature 1, Create an Account">Create an Account</h3><br />
                            <span style={{fontWeight: 300, fontSize: 13}} tabIndex={0}>
                                Create a driver or passenger profile and fill in your personal details such as email, phone number, disabilities, impairments, etc.
                            </span>
                        </FeaturesDesc>
                    </Feature>

                    <Feature>
                        <ContentPasteIcon style={{width: 110, height: 110, color: '#9692d9'}} role="img" aria-label="Take a Training Module Image" />
                        <FeaturesDesc>
                            <h3 style={{fontWeight: 300}} tabIndex={0} aria-label="Feature 2, Take a Training Module">Take a Training Module</h3><br />
                            <span style={{fontWeight: 300, fontSize: 13}} tabIndex={0}>
                                Opt-in to the training module to become a certified driver, meaning you can provide rides to people with disabilities/impairments.
                            </span>
                        </FeaturesDesc>
                    </Feature>

                    <Feature>
                        <DirectionsCarIcon style={{width: 110, height: 110, color: '#e95353'}} role="img" aria-label="Get Ride Matches Image" />
                        <FeaturesDesc>
                            <h3 style={{fontWeight: 300}} tabIndex={0} aria-label="Feature 3, Get Ride Matches">Get Ride Matches</h3><br />
                            <span style={{fontWeight: 300, fontSize: 13}} tabIndex={0}>
                                Get matched with multiple drivers/passengers that match your desired ride based on location, time, etc.
                            </span>
                        </FeaturesDesc>
                    </Feature>
                </Features>
            </ServicesContainer>
        </div>
    )
}

export default Services;