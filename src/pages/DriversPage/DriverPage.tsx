import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Description from "../../components/Description/Description";
import DriverMap from "../../components/DriverMap/DriverMap";

const DriversPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    }
    
    return (
        <div>
            <NavBar toggle={toggle} />
            <Description title="Offer a ride" description="Help out your community by driving from location A to location B"/>
            {/* TODO: change to custom driver map */}
            <DriverMap></DriverMap>
        </div>
    );
}

export default DriversPage;