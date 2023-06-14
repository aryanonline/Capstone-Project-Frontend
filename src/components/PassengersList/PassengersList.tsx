import React, { useState, useEffect } from "react";
import axios from "axios";
import { passengerType } from "../../pages/Driver-Accepted-Rides-Page/DriverAcceptedRidesPage";

interface Props {
    passenger: passengerType;
}

const PassengersList: React.FC<Props> = ({ passenger }: Props) => {
    const [pickupAddress, setPickupAddress] = useState<string>("");

    useEffect(() => {
        const driverlatlng = {
            lat: passenger?.pickup_lat,
            lng: passenger?.pickup_long
        };
        const geocoder = new google.maps.Geocoder;

        // get the address string for the passenger lat lng
        geocoder.geocode({location: driverlatlng}, (response) => {
            setPickupAddress(response[0].formatted_address);
        }); 
    }, [passenger]); 

    return(
        <div className="ride-info">
            <div>
                <p tabIndex={0}><u><b>Passenger Info:</b></u></p>
                <p tabIndex={0}><b>Passenger Name: </b>{passenger?.passenger_name}</p>
                <p tabIndex={0}><b>Pickup Location: </b>{pickupAddress}</p>
            </div>
            <br />
        </div>
    )
}

export default PassengersList;