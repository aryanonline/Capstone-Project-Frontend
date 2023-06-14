import React, { useState, useEffect } from "react";
import "./DriverAcceptedRidesPage.scss";
import NavBar from "../../components/NavBar/NavBar";
import DriverAcceptedRides from "../../components/DriverAcceptedRides/DriverAcceptedRides";
import axios from "axios";

export type passengerType = {
    passenger_name: string,
    pickup_lat: number,
    pickup_long: number
};

type ridesType = {
    id: string,
    arrival_time: Date,
    destination: {
        destination_name: string,
    }
    passengers: passengerType[]
}

const DriverAcceptedRidesPage = () => {
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [rides, setRides] = useState<ridesType[]>([]);

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

    const fetchData = () => { 
        let driverID: string = sessionStorage.getItem("id");   

        axios.get("/api/driver", { params: { driverID: driverID } }).then(({data}) => {
            axios.get("/api/user/acceptedRides", { params: { userID: data[0]?.userID["$oid"] } }).then(({data}) => {
                let ridePromises = data.map(element => {
                    let ride: ridesType = {
                        id: "",
                        arrival_time: undefined,
                        destination: {
                            destination_name: undefined,
                        },
                        passengers: []
                    };
                    
                    ride.id = element[0]?._id["$oid"];
                    ride.arrival_time = new Date(element[0]?.arrivalDateTime["$date"]);
                    ride.destination.destination_name = getLocation(element[0]?.destinationID["$oid"]);

                    let passengerPromise = element[0]?.passengers.map(elem => {
                        let passenger: passengerType = {
                            passenger_name: undefined,
                            pickup_lat: 0,
                            pickup_long: 0
                        };

                        return axios.get("/api/passenger", { params: { passengerID: elem?.passengerID["$oid"] } }).then(({data}) => {
                            return axios.get("/api/user", { params: { userID: data[0]?.userID["$oid"] } }).then(({data}) => {
                                passenger.passenger_name = data[0]?.firstName + " " + data[0]?.lastName;

                                return axios.get("/api/location", { params: { locationID: elem.pickupLocationID["$oid"]} }).then(({data}) => {
                                    passenger.pickup_lat = data[0]?.latitude;
                                    passenger.pickup_long = data[0]?.longitude;

                                    return passenger;
                                });
                            }); 
                        });
                    });
                    return Promise.all(passengerPromise).then(passengers => {
                        ride.passengers = passengers;
                        return ride;
                    }).catch(() => {
                        return [];
                    });      
                });
                Promise.all(ridePromises).then(rides => {
                    setRides(rides); 
                }).catch(() => {
                    return [];
                });
            });
        }).catch(({response}) => {
            console.log(response);
            console.log(response.status);
            console.log(response.headers);
        }); 
    }    

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div>
            <NavBar toggle={toggle} />
            <div className="passenger-container">
                <h1 id="accepted-rides-title">Accepted Rides</h1>
                <p id="accepted-rides-desc">View all the rides that have been accepted by you and your passengers.</p>
                    {
                        rides.map((ride, i) => (
                            <DriverAcceptedRides 
                                key={i}
                                rideId={ride.id}
                                passengers={ride.passengers}
                                arrivalTime={ride.arrival_time}
                                destinationName={ride.destination.destination_name}
                            />
                        ))
                    }
            </div>
        </div>
    )
}

export default DriverAcceptedRidesPage;