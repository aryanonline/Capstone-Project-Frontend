import React, { useContext, useState, useEffect } from "react";
import "./PassengerAcceptDeny.scss";
import { Button, Accordion, Link } from "@mui/material";
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { locationProp } from "../../pages/Passengers-Accept-Deny-Page/PassengersAcceptDenyPage";

type passengerAcceptDenyProps = {
    id: string,
    requestId: string,
    driverId: string,
    driverLoc: locationProp,
    pickupLocId: string,
    destinationId: string,
    name: string,
    pricing: string,
    description: string,
    initialLoc: locationProp,
    arrivalTime: Date
};

const PassengerAcceptDeny = ({ id, requestId, driverId, driverLoc, pickupLocId, destinationId, name, pricing='', description='', initialLoc, arrivalTime }: passengerAcceptDenyProps) => {
    const [acceptClicked, setAcceptClicked] = React.useState<boolean>(false);
    const {state} = useContext(AuthContext);
    const [driverAddress, setDriverAddress] = useState<string>("");

    useEffect(() => {
        const latlng = {
            lat: driverLoc.latitude,
            lng: driverLoc.longitude
        };
        const geocoder = new google.maps.Geocoder;

        // get the address string for the pickup location
        geocoder.geocode({location: latlng}, (response) => {
            setDriverAddress(response[0].formatted_address);
        }); 
    }, []); 

    const acceptOffer = () => {
        let passengerID = state.id;
        const passengers = {
            passengerID: passengerID,
            pickupLocationID: pickupLocId
        };

        axios.post("/api/ride", { 
            driverID: driverId, 
            driverStartLat: driverLoc.latitude,
            driverStartLong: driverLoc.longitude,
            passengers: [passengers], 
            pricing: pricing,
            description: description,
            destinationID: destinationId, 
            departureDate: arrivalTime.toLocaleDateString('en-US', { timeZone: 'UTC' }),
            arrivalTime: `${arrivalTime.getUTCHours()}:${arrivalTime.getUTCMinutes()}`,
        }).then(({data}) => {
            document.getElementById(requestId).style.display = "none";
            // delete request after rides created
            axios.post("/api/request/deleteRequest", null, { params: {requestID: requestId, passengerID: passengerID} }).then(({data}) => {
                alert("Ride Created");

                
            });
        }).catch(({response}) => {
            console.log(response);
            console.log(response.status);
            console.log(response.headers);
            // passenger is already in a ride with this driver on the same day
            if (response.status == 401) {
                alert(response?.data);

                axios.put("/api/request/deleteOffer", null, { params: {requestID: requestId, offerID: id} }).then(({data}) => {
                    document.getElementById(id).style.display = "none";
                }).catch(({response})=> {
                    console.log(response);
                    console.log(response.status);
                    console.log(response.headers);
                })
            }
        });
    };

    // delete the offer if the offer is declined by the potential passenger
    const declineOffer = () => {
        axios.put("/api/request/deleteOffer", null, { params: {requestID: requestId, offerID: id} }).then(({data}) => {
            document.getElementById(id).style.display = "none";
        }).catch(({response}) => {
            console.log(response);
            console.log(response.status);
            console.log(response.headers);
        });
    };

    return(
        <Accordion id={id}>
            <AccordionSummary
                expandIcon={<Button variant="outlined">View Info</Button>}
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
                    <p tabIndex={0}><b>Scoop Offered By:</b> {name}</p>
                    {/* TODO: change to this how many km away the driver is from the passenger */}
                    <p tabIndex={0}><b>Departure Location: </b>{driverAddress}</p>
                    <p tabIndex={0}><b>Estimated Arrival Time:</b> {arrivalTime.toLocaleString('en-US', { timeZone: 'UTC' })}</p>
                </div>
            </AccordionSummary>
            <AccordionDetails className="driver-accordian-info">
                <div className="offer-details">
                    <div className="details-container">
                        <p tabIndex={0}><b>Pricing:</b> {pricing}</p>
                        <p tabIndex={0}><b>Description:</b> {`\n${description}`}</p>
                    </div>
                    <div className="buttons-container">
                        <Button tabIndex={0} variant="contained" color="success" onClick={acceptOffer}>Accept</Button>
                        <Button tabIndex={0} variant="contained" color="error" onClick={declineOffer}>Deny</Button>
                    </div>
                </div>
            </AccordionDetails>
            <div style={{ display: `${acceptClicked ? 'contents' : 'none'}` }}>
                <iframe 
                    // src="/api/map"
                    id="route-map" 
                    title="google map frame for route"
                    data-type="text/html"
                    frameBorder="0">
                </iframe>
            </div>
        </Accordion>
    )
}

export default PassengerAcceptDeny;