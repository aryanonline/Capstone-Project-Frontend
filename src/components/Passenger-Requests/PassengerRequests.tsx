import React, { useEffect, useState } from "react";
import "../PassengerAcceptDeny/PassengerAcceptDeny.scss";
import PassengerAcceptDeny from "../PassengerAcceptDeny/PassengerAcceptDeny";
import { Button, Accordion, Link } from "@mui/material";
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { offerProps, locationProp } from "../../pages/Passengers-Accept-Deny-Page/PassengersAcceptDenyPage";

type passengerRequestsProps = {
    id: string, 
    offers: offerProps[],
    pickupLocationID: string,
    pickupLocation: locationProp,
    destinationID: string,
    destination: locationProp,
    arrivalTime: Date
}; 

const getLocation = (locationID) => {
    if (locationID == "63f66cac59662758b0ce6edc") {
        return "Ontario Tech University - North Campus";
    }
    else if (locationID == "63f66f8359662758b0ce6ee0") {
        return "Ontario Tech University - Downtown Campus";
    }
    else if (locationID == "63f66fa459662758b0ce6ee1") {
        return "Ontario Power Generation";
    }
    else if (locationID == "63f66fb659662758b0ce6ee2") {
        return "General Motors of Canada";
    }
}

const PassengerRequests = ({ id, offers, pickupLocationID, pickupLocation, destinationID, destination, arrivalTime }: passengerRequestsProps) => {
    const [pickupAddress, setPickupAddress] = useState<string>("");
    const [destAddress, setDestAddress] = useState<string>("");

    useEffect(() => {
        const pickuplatlng = {
            lat: pickupLocation.latitude,
            lng: pickupLocation.longitude
        };
        const geocoder = new google.maps.Geocoder;

        // get the address string for the pickup location
        geocoder.geocode({location: pickuplatlng}, (response) => {
            setPickupAddress(response[0].formatted_address);
        }); 

        setDestAddress(getLocation(destinationID))
    }, []); 
    
    return(
        <Accordion className="request-container" id={id}>
            <AccordionSummary
                expandIcon={<Button variant="outlined">View Offers</Button>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                    "& .MuiAccordionSummary-expandIconWrapper": {
                      transition: "none",
                      "&.Mui-expanded": {
                        transform: "none",
                      },
                    },
                }}
                >
                <div>
                    <p tabIndex={0}><b>Pickup Location: </b> {pickupAddress}</p>
                    <p tabIndex={0}><b>Destination Location: </b>{destAddress}</p>
                    <p tabIndex={0}><b>Departure Date: </b>{`${arrivalTime.toLocaleDateString('en-US', { timeZone: 'UTC' })}`}</p>
                    <p tabIndex={0}><b>Requested Arrival Time: </b>{`${arrivalTime.toLocaleTimeString('en-US', { timeZone: 'UTC' })}`}</p>
                </div>
            </AccordionSummary>
            <AccordionDetails className="driver-accordian-info">
                {
                    offers.length > 0 ?
                        offers.map((offer) => (
                            <PassengerAcceptDeny
                                key={`${offer.id}`}
                                id={`${offer.id}`}
                                requestId={`${id}`}
                                driverId={`${offer.driverId}`}
                                driverLoc={offer.driverStartLoc}
                                pickupLocId={`${pickupLocationID}`}
                                destinationId={`${destinationID}`}
                                name={`${offer.driverName}`}
                                pricing={`${offer.pricing}`} 
                                description={`${offer.description}`} 
                                initialLoc={pickupLocation}
                                arrivalTime={offer.driverArrivalTime}
                            />
                        ))
                    :
                    <div tabIndex={0}>No Scoops Offered :(</div>
                }
            </AccordionDetails>
        </Accordion>
    )
}

export default PassengerRequests;