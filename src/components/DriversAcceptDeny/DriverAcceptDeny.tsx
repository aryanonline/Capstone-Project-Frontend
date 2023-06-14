import React, { useContext, useState, useEffect } from "react";
import "./DriverAcceptDeny.scss";
import { Button, Accordion } from "@mui/material";
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import { driverLocType } from "../../pages/Drivers-Accept-Deny-Page/DriversAcceptDenyPage";
import { AuthContext } from "../../context/AuthContext";

const DriverAcceptDeny = ({ requestID, passengerName, hasImpairments, departureDate, arrivalTime, driverLoc, startLoc, endLoc }: {requestID: string, passengerName: string, hasImpairments: boolean, departureDate: Date, arrivalTime: Date, driverLoc: driverLocType, startLoc: [], endLoc: []}) => {
    const [offerClicked, setOfferClicked] = React.useState<boolean>(false);
    const [rescindClicked, setRescindClicked] = React.useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [pricing, setPricing] = useState<string>("N/A");
    const [description, setDescription] = useState<string>("N/A"); 
    const {state} = useContext(AuthContext);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    // make scoop offer to given request
    const offerOnClick = () => {
        handleClose();
        const driverArrivalTime = new Date(sessionStorage.getItem("driverArrivalTime"));
        const driverArrivalTimeString = `${driverArrivalTime.getHours()}:${driverArrivalTime.getMinutes()}`;

        axios.post("/api/request/offer",{requestID: requestID, driverID: state.id, pricing: pricing, description: description, driverStartLoc: driverLoc, driverArrivalTime: driverArrivalTimeString}).then(({data}) => {
            setOfferClicked(true);
            sessionStorage.removeItem("driverArrivalTime");
            sessionStorage.removeItem("driverLocation");
            sessionStorage.setItem("offerID", JSON.stringify(data[0]?._id["$oid"]));
        }).catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
        });
    };

    const rescindOnClick = () => {
        axios.put("/api/request/deleteOffer", null ,{params: {requestID: requestID, offerID: JSON.parse(sessionStorage.getItem("offerID"))}}).then(() => {
            setRescindClicked(true);
        }).catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
        });
    };

    const [startAddress, setStartAddress] = useState<string>("");
    const [endAddress, setEndAddress] = useState<string>("");

    useEffect(() => {
        const startlatlng = {
            lng: startLoc.pop(),
            lat: startLoc.pop (),
        };
        const geocoder = new google.maps.Geocoder;

        // get the address string for the pickup location
        geocoder.geocode({location: startlatlng}, (response) => {
            setStartAddress(response[0].formatted_address);
        }); 

        const endlatlng = {
            lng: endLoc.pop(),
            lat: endLoc.pop (),
        };

        // get the address string for the pickup location
        geocoder.geocode({location: endlatlng}, (response) => {
            setEndAddress(response[0].formatted_address);
        }); 
    }, []);

    return(
        <>
        <Accordion className="accept-deny-container">
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
                    <p tabIndex={0}><b>Scoop Requested:</b> {passengerName}</p>
                    <p tabIndex={0}><b>Departure Date: </b>{`${departureDate.toLocaleDateString('en-US', { timeZone: 'UTC' })}`}</p>
                    <p tabIndex={0}><b>Is Impaired: </b>{`${hasImpairments}`}</p>
                </div>
            </AccordionSummary>
            <AccordionDetails className="driver-accordian-info">
                <div className="offer-details">
                    <div className="details-container">
                        <p tabIndex={0}><b>Arrival Time: </b>{`${arrivalTime.toLocaleTimeString('en-US', { timeZone: 'UTC' })}`}</p>
                        <p tabIndex={0}><b>Pickup Location: </b>{startAddress}</p>
                        <p tabIndex={0}><b>Destination: </b>{endAddress}</p>                  
                    </div>
                    <div className="buttons-container">
                        {
                            offerClicked ? 
                            <Button variant="contained" color="primary" onClick={rescindOnClick}>Rescind Offer</Button>
                            :
                            <Button variant="contained" color="success" onClick={handleClickOpen}>Offer</Button>
                        }
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
        
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle tabIndex={0}>Scoop Offer Details</DialogTitle>
            <DialogContent>
                <DialogContentText tabIndex={0}>
                    Scoop is not responsible for any monetary transactions between the parties, 
                    however if you would like to split the cost of travel, please specify your
                    method of choice below to inform your potential passenger.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="pricing"
                    label="Pricing"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={({target}) => setPricing(target.value)}
                    tabIndex={0}
                />
                <br /><br />
                <DialogContentText tabIndex={0}>
                        Anything else you would like the passenger to know?
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="pricing"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={({target}) => setDescription(target.value)}
                    tabIndex={0}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={offerOnClick} tabIndex={0}>Offer Scoop</Button>
                <Button onClick={handleClose} tabIndex={0}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default DriverAcceptDeny;