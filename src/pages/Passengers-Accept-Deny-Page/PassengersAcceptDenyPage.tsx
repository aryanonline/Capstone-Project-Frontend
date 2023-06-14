import React, { useState, useEffect, useContext } from "react";
import "./PassengersAcceptDenyPage.scss";
import NavBar from "../../components/NavBar/NavBar";
import PassengerRequests from "../../components/Passenger-Requests/PassengerRequests";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export type locationProp = {
    latitude: number,
    longitude: number 
};

export type offerProps = {
    id: string,
    driverId: string,
    driverStartLoc: locationProp,
    driverName: string, 
    pricing: string,
    description: string,
    driverArrivalTime: Date,
    isAccepted: string
};

export type requestProp = {
    id: string,
    pickupLocationID: string,
    pickupLocation: locationProp,
    destinationID: string,
    destination: locationProp,
    arrivalTime: Date,
    offers: offerProps[]
};

const PassengersAcceptDenyPage: React.FC= () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [requests, setRequests] = useState<requestProp[]>([]);
    const {state} = useContext(AuthContext);
    const [address, setAddress] = useState<String>('')

    useEffect(() => {
        let passengerID: string = state?.id;
        
        axios.get("/api/passenger", { params: {passengerID: passengerID} }).then(({data}) => {
            const request_list = data[0]?.requests;
            
            let requestPromise = request_list.map(request => {
                const req: requestProp = {
                    id: "",
                    pickupLocationID: "",
                    pickupLocation: {
                        latitude: 0,
                        longitude: 0
                    },
                    destinationID: "",
                    destination: {
                        longitude: 0,
                        latitude: 0
                    },
                    arrivalTime: new Date(),
                    offers: []
                };

                return axios.get("/api/request", { params: {requestID: request["$oid"]} }).then(({data}) => {
                    req.id = data[0]?._id["$oid"];
                    req.pickupLocationID = data[0]?.pickupLocationID["$oid"];
                    req.destinationID = data[0]?.destinationID["$oid"];
                    req.arrivalTime = new Date(data[0]?.arrivalTime["$date"]);

                    if (data[0]?.offers){
                        let offersPromise = data[0]?.offers.map(offer => {
                            let o: offerProps = {
                                id: "",
                                driverId: "",
                                driverStartLoc: undefined,
                                driverName: "",
                                pricing: "",
                                description: "",
                                driverArrivalTime: undefined,
                                isAccepted: ""
                            }
                            
                            o.id = offer?._id["$oid"];
                            o.driverId = offer?.driverID["$oid"];
                            o.driverStartLoc = {
                                latitude: offer?.driverStartLoc?.driverStartLat,
                                longitude: offer?.driverStartLoc?.driverStartLong
                            }
                            o.pricing = offer?.pricing;
                            o.description = offer?.description;
                            o.driverArrivalTime = new Date(offer?.driverArrivalTime["$date"]);
                            o.isAccepted = offer?.isAccepted;
                            
                            return axios.get("/api/driver", { params: {driverID: offer?.driverID["$oid"]} }).then(({data}) => {
                                return axios.get("/api/user", { params: {userID: data[0]?.userID["$oid"]} }).then(({data}) => {
                                    o.driverName = data[0]?.firstName + " " + data[0]?.lastName;
                                    
                                    return o;
                                });
                            });
                        });
                        Promise.all(offersPromise).then(offers => {
                            req.offers = offers;
                        });
                    }
                    
                    let reqData = data[0];
                    return axios.get("/api/location", { params: {locationID: reqData?.pickupLocationID["$oid"]} }).then(({data}) => {
                        req.pickupLocation = {
                            latitude: data[0]?.latitude,
                            longitude: data[0]?.longitude
                        };

                        return axios.get("/api/location", { params: {locationID: reqData?.destinationID["$oid"]} }).then(({data}) => {
                            req.destination = {
                                latitude: data[0]?.latitude,
                                longitude: data[0]?.longitude
                            };

                            return req;
                        });
                    });
                });
            }); 
            Promise.all(requestPromise).then(requests => {
                setRequests(requests)
            })
        }).catch(({response}) => {
            console.log(response);
            console.log(response.status);
            console.log(response.headers);
        });        

    }, []);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return(
        <div>
            <NavBar toggle={toggle} />
            <div className="driver-container">
                {
                    requests.map((request) => (
                        <PassengerRequests 
                            key={`${request.id}`}
                            id={`${request.id}`}
                            offers={request.offers}
                            pickupLocationID={`${request.pickupLocationID}`}
                            pickupLocation={request.pickupLocation}
                            destinationID={`${request.destinationID}`}
                            destination={request.destination}
                            arrivalTime={request.arrivalTime}
                        />
                    ))
                }
                {requests.length == 0 && <h2 style={{textAlign: "center"}}>No Previous Requests.</h2>}
            </div>
        </div>
    )
}

export default PassengersAcceptDenyPage;