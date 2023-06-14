import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Home from "../../components/Home/Home";
import Summary from "../../components/Summary/Summary"
import Services from "../../components/Services/Services";

const WelcomePage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const scrollToView = () => {
        const view = document.getElementById('services');
        if (view) {
            view.scrollIntoView({ behavior: 'smooth'});
        }
    }

    return(
        <div>
            <NavBar toggle={toggle} />
            <Home />
            <Summary />
            <br />
            <Services />
        </div>
    );
}

export default WelcomePage;