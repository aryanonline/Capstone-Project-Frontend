import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import PassengerAcceptedRides from "../../components/PassengerAcceptedRide/PassengerAcceptedRide";

type vehicleType = {
    make: string,
    model: string,
    year: number,
    licencePlate: string
};

export type driverType = {
    driver_name: string,
    start_lat: number,
    start_long: number,
    vehicle: vehicleType
};

export type ridesType = {
    id: string,
    arrival_time: Date,
    driver: driverType,
    pricing: string,
    description: string,
    destination: {
        destination_name: string,
    }
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

const PassengerAcceptedRidesPage = () => {
    const toggle = () => {
        setIsOpen(!isOpen);
    };
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [rides, setRides] = useState<ridesType[]>([]);

    const fetchData = () => { 
        let passengerID: string = sessionStorage.getItem("id");   

        axios.get("/api/passenger", { params: { passengerID: passengerID } }).then(({data}) => {
            axios.get("/api/user/acceptedRides", { params: { userID: data[0]?.userID["$oid"] } }).then(({data}) => {
                let ridePromises = data.map(element => {
                    let ride: ridesType = {
                        id: "",
                        arrival_time: undefined,
                        driver: {
                            driver_name: "",
                            start_lat: 0,
                            start_long: 0,
                            vehicle: {
                                make: "",
                                model: "",
                                year: new Date().getFullYear(),
                                licencePlate: ""
                            }
                        },
                        pricing: "",
                        description: "",
                        destination: {
                            destination_name: "",
                        },
                    };
    
                    ride.id = element[0]?._id["$oid"];
                    ride.arrival_time = new Date(element[0]?.arrivalDateTime["$date"]);
                    ride.pricing = element[0]?.pricing;
                    ride.description = element[0]?.description;
                    ride.destination.destination_name = getLocation(element[0]?.destinationID["$oid"]);
                    ride.driver.start_lat = element[0]?.driverStartLat;
                    ride.driver.start_long = element[0]?.driverStartLong;
                                        

                    return axios.get("/api/driver", { params: { driverID: element[0]?.driverID["$oid"] } }).then(({data}) => {
                        ride.driver.vehicle = data[0]?.vehicle;
                        return axios.get("/api/user", { params: { userID: data[0]?.userID["$oid"] } }).then(({data}) => {
                            ride.driver.driver_name = data[0]?.firstName + " " + data[0]?.lastName;
                            return ride
                        });                        
                    });       
                });
                Promise.all(ridePromises).then(rides => {
                    setRides(rides); 
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
                <p id="accepted-rides-desc">View all the rides that have been accepted by you and your driver.</p>
                {
                    rides.map((ride, i) => (
                        <PassengerAcceptedRides 
                            key={i}
                            rideId={ride.id}
                            driver={ride.driver}
                            ride={ride}
                            destinationName={ride.destination.destination_name}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default PassengerAcceptedRidesPage;