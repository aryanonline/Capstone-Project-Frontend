import React, { useState, useEffect } from "react";
import "./DriversAcceptDenyPage.scss";
import NavBar from "../../components/NavBar/NavBar";
import DriverAcceptDeny from "../../components/DriversAcceptDeny/DriverAcceptDeny";
import axios from "axios";

type requestsProp = {
    request_id: Object,
    id: Object,
    passengerName: string,
    has_impairments: boolean,
    departure_date: Date,
    arrival_time: Date,
    start: [],
    end: []
};

export type driverLocType = {
    driverStartLat: number,
    driverStartLong: number
}

const DriversAcceptDenyPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [recommendedRequests, setRecommendedRequests] = useState<requestsProp[]>([]);
    const [driverLoc, setDriverLoc] = useState<driverLocType>();

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const requests = JSON.parse(sessionStorage.getItem("recommendedRequests"));
        setDriverLoc(JSON.parse(sessionStorage.getItem("driverLocation")));
        sessionStorage.removeItem("recommendedRequests");

        requests.forEach(request => {
            request["departure_date"] = new Date(request?.departure_date["$date"]);
            request["arrival_time"] = new Date(request?.arrival_time["$date"]);

            axios.get("/api/passenger", { params: {passengerID: request?.id["$oid"]} }).then(({data}) => {
                axios.get("/api/user", { params: {userID: data[0]?.userID["$oid"]} }).then(({data}) => {
                    request["passengerName"] = data[0]?.firstName + " " + data[0]?.lastName;
                    setRecommendedRequests(prevRequests =>  [...prevRequests, request]);
                });
            }).catch(({response}) => {
                console.log(response);
                console.log(response.status);
                console.log(response.headers);
            });
        });
    }, []);

    return(
        <div>
            <NavBar toggle={toggle} />
            <div className="passenger-container">
                {
                    recommendedRequests.map((request, i) => (
                        <DriverAcceptDeny 
                            key={i}
                            requestID={request.request_id["$oid"]}
                            passengerName={request.passengerName}
                            hasImpairments={request.has_impairments}
                            departureDate={request.departure_date}
                            arrivalTime={request.arrival_time}
                            driverLoc={driverLoc}
                            startLoc={request.start}
                            endLoc={request.end}
                        />
                    ))
                }
                {recommendedRequests.length == 0 && <h2 style={{textAlign: "center"}}>No Requests Recommended.</h2>}
            </div>
        </div>
    )
}

export default DriversAcceptDenyPage;