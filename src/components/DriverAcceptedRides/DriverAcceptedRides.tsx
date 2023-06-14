import React, { useState } from "react";
import "./DriverAcceptedRides.scss";
import { Button, Accordion } from "@mui/material";
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { passengerType } from "../../pages/Driver-Accepted-Rides-Page/DriverAcceptedRidesPage";
import PassengersList from "../../components/PassengersList/PassengersList";
import axios from "axios";

interface Props {
    rideId: string;
    passengers: passengerType[];
    arrivalTime: Date;
    destinationName: string;
}

const DriverAcceptedRides: React.FC<Props> = ({ rideId, passengers, arrivalTime, destinationName}: Props) => {
    const [map, setMap] = useState<string>("");

    const fetchMap = () => {
        axios.get("/api/map", { params: {rideID: rideId} }).then(({data}) => {
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
                        <p tabIndex={0}><b>Scoop Info:</b></p>
                        <p tabIndex={0}><b>Destination: </b>{`${destinationName}`}</p>
                        <p tabIndex={0}><b>Arrival: </b>{`${arrivalTime.toDateString()} at ${arrivalTime.toLocaleTimeString('en-US', { timeZone: 'UTC' })}`}</p>
                    </div>
            </AccordionSummary>
            <AccordionDetails className="rides-accordian-info">
                <div className="ride-details">
                    <div className="details-container">
                        {
                            passengers?.map((passenger, i) => (
                                <PassengersList
                                    key={i}
                                    passenger={passenger}
                                />
                            ))
                        }
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
            </AccordionDetails>
        </Accordion>
    )
}

export default DriverAcceptedRides;