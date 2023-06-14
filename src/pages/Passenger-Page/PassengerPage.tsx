import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import PassengerMap from "../../components/PassengerMap/PassengerMap";
import Description from "../../components/Description/Description";

const PassengerPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return(
        <div>
            <NavBar toggle={toggle} />
            <Description title="Request a Scoop" description="Make a request for a scoop, available drivers may offer to pick you up on the way to their destination"/>
            <PassengerMap />
        </div>
    )
}

export default PassengerPage;