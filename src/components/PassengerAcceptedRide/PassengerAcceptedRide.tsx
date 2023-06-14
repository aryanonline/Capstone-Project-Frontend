import React, { useEffect, useState, useContext } from "react";
import { Button, Accordion } from "@mui/material";
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { driverType, ridesType } from "../../pages/Passenger-Accepted-Rides-Page/PassengerAcceptedRidesPage";

interface Props {
    rideId: string;
    driver: driverType;
    ride: ridesType;
    destinationName: string;
}

const PassengerAcceptedRides: React.FC<Props> = ({ rideId, driver, ride, destinationName }: Props) => {
    const [map, setMap] = useState<string>("");
    const {state} = useContext(AuthContext);
    const [driverAddress, setDriverAddress] = useState<string>("");

    useEffect(() => {
        const driverlatlng = {
            lat: driver.start_lat,
            lng: driver.start_long
        };
        const geocoder = new google.maps.Geocoder;

        // get the address string for the driver lat lng
        geocoder.geocode({location: driverlatlng}, (response) => {
            setDriverAddress(response[0].formatted_address);
        }); 
    }, []); 

    const fetchMap = () => {
        axios.get("/api/map", { params: {rideID: rideId, passengerID: state.id} }).then(({data}) => {
            setMap(`data:text/html;charset=utf-8,${encodeURIComponent(data)}`);
        }).catch(({response}) => {
            console.log(response);
            console.log(response.status);
            console.log(response.headers);
        });
    }

    return(
        <Accordion className="accepted-rides-container">
            <AccordionSummary
                expandIcon={<Button variant="outlined">View Info</Button>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => {map == "" && fetchMap()}}
                sx={{
                    "& .MuiAccordionSummary-expandIconWrapper": {
                      transition: "none",
                      "&.Mui-expanded": {
                        transform: "none",
                      },
                    },
                }}>
                    <div>
                        <p tabIndex={0}><u><b>Scoop Info:</b></u></p>
                        <p tabIndex={0}><b>Driver Name: </b>{`${driver.driver_name}`}</p>
                        <p tabIndex={0}><b>Driver Starting Location: </b>{driverAddress}</p>
                        <p tabIndex={0}><b>Destination: </b>{`${destinationName}`}</p>
                        <p tabIndex={0}><b>Estimated Time of Arrival to Destination: </b>{`${ride.arrival_time.toDateString()} at ${ride.arrival_time.toLocaleTimeString('en-US', { timeZone: 'UTC' })}`}</p>
                    </div>
            </AccordionSummary>
            <AccordionDetails className="rides-accordian-info">
                <div className="ride-details">
                    <div className="details-container">
                        <div className="ride-details">
                            <div className="details-container">
                                <div>
                                    <p tabIndex={0}><u><b>Ride Info:</b></u></p>
                                    <p tabIndex={0}><b>Price: </b>{ride.pricing}</p>
                                    <p tabIndex={0}><b>Description: </b>{ride.description}</p>
                                </div>
                                <br />
                                <div>
                                    <p tabIndex={0}><u><b>Vehicle Info:</b></u></p>
                                    <p tabIndex={0}><b>Car Make: </b>{driver.vehicle.make}</p>
                                    <p tabIndex={0}><b>Car Model: </b>{driver.vehicle.model}</p>
                                    <p tabIndex={0}><b>Car Year: </b>{driver.vehicle.year}</p>
                                    <p tabIndex={0}><b>Car Licence Plate: </b>{driver.vehicle.licencePlate}</p>
                                </div>
                            </div>

                            <iframe
                                src={map}
                                className="map-container"
                                id="route-map" 
                                title="google map frame for route"
                                data-type="text/html"
                                frameBorder="0">
                            </iframe>
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}

export default PassengerAcceptedRides;