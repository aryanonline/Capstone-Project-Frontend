import React from "react";
import './PassengerMap.scss';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, TextField } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AddressSearch from "../AddressPicker/AddressSearch";

const PassengerMap = () => {
    const navigate = useNavigate();
    const [location, setLocation] = React.useState<string>("");
    const [url, setUrl] = React.useState<string>("");
    const [locationSelected, setLocationSelected] = React.useState<string>('none');
    const [lat, setLat] = React.useState<number>(0);
    const [lng, setLng] = React.useState<number>(0);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPos, () => {}, {timeout:10000});

        function getPos(position) {
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
        }
    }
    const now = new Date();
    now.setTime(now.getTime() + 4 * 60000);
    const [date, setDate] = React.useState<Dayjs | null>(dayjs(now.toISOString()));

    const handleSelectionChange = ({ target }) => {
        setLocation(target.value);
        if (target.value == "63f66cac59662758b0ce6edc") {
            setUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2872.6630495123018!2d-78.89897528427008!3d43.94564664148812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d51b9a6af8ae7f%3A0x2a373a19593716f5!2sOntario%20Tech%20University!5e0!3m2!1sen!2sca!4v1669855474888!5m2!1sen!2sca");
        }
        else if (target.value == "63f66f8359662758b0ce6ee0") {
            setUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2875.008714133467!2d-78.86024808427122!3d43.89708624464338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d51cdc32a11087%3A0x2aec4e0c8b1214e1!2sOntario%20Tech%20University%20-%20Charles%20Hall!5e0!3m2!1sen!2sca!4v1669854178777!5m2!1sen!2sca");
        }
        else if (target.value == "63f66fa459662758b0ce6ee1") {
            setUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d66284.97578042072!2d-78.95997594744782!3d43.9103602978126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d51ce413dc9b63%3A0xdd0e9e5e9442dc0f!2sOntario%20Power%20Generation%20Oshawa%20Training%20Centre!5e0!3m2!1sen!2sca!4v1669855629193!5m2!1sen!2sca");
        }
        else if (target.value == "63f66fb659662758b0ce6ee2") {
            setUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.2310360210195!2d-78.86524828427184!3d43.87176454628749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d51d6e474d020f%3A0x91d27aa810af2369!2sGM%20Oshawa%20Assembly!5e0!3m2!1sen!2sca!4v1669855779074!5m2!1sen!2sca");
        }
        setLocationSelected('block');
    };

    const handleDateChange = (newDate: Dayjs | null) => {
        console.log(newDate);
        setDate(newDate);
    };

    const handleRequestScoop = (e) => {
        e.preventDefault();
        // check arrival date time tosee if it's a valid date
        if (date == null || isNaN(date.valueOf()) || date.isBefore(dayjs().add(4, 'minute'))) {
            alert("Please select a valid arrival time.");
            return;
        }

        // TODO: take out next line before commiting
        setLat(Number(sessionStorage.getItem("latitude")));
        setLng(Number(sessionStorage.getItem("longitude")));
        axios.post("/api/location", null, { params: { latitude: String(lat), longitude: String(lng) }}).then(({data}) => {
            const request_data = {
                passengerID: sessionStorage.getItem("id"),
                pickupLocationID: data[0]?._id["$oid"],
                destinationID: location,
                departureDate: `${date.year()}-${date.month() + 1}-${date.date()}`,
                arrivalTime: `${date.hour()}:${date.minute()}:${date.second()}`
            };
            axios.post("/api/request", request_data).then(() => {
                navigate('/passenger/accept-deny');
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            });
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        });
    };

    return(
        <form onSubmit={handleRequestScoop}>
            <div id="map-selection-container">
                <div id="selection-container">
                    <Box>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Location</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={location}
                                label="Location"
                                onChange={handleSelectionChange}
                                required
                            >
                                <MenuItem value={"63f66cac59662758b0ce6edc"}>Ontario Tech Univeristy - North Campus</MenuItem>
                                <MenuItem value={"63f66f8359662758b0ce6ee0"}>Ontario Tech Univeristy - Downtown Campus</MenuItem>
                                <MenuItem value={"63f66fa459662758b0ce6ee1"}>Ontario Power Generation</MenuItem>
                                <MenuItem value={"63f66fb659662758b0ce6ee2"}>General Motors of Canada</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <div id="startingLocation">
                        <AddressSearch/>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Departure Date"
                            inputFormat="MM/DD/YYYY"
                            value={date}
                            minDate={dayjs()}
                            maxDate={dayjs().add(1, 'month')}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} required/>}
                        />
                        <TimePicker
                            label="Arrival Time"
                            value={date}
                            minTime={dayjs().isSame(date, 'day') ? dayjs().add(4, 'minute') : null}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} required/>}
                        />
                    </LocalizationProvider>                 
                </div>
                
                <div id="map-container">
                    <iframe 
                        id="map" 
                        title="google map frame"
                        data-type="text/html"
                        src={url}
                        frameBorder="0">
                    </iframe>
                </div>
            </div>
            
            <Button 
                variant="contained" 
                id="requestBtn" 
                type="submit"
                style={{'display': `${locationSelected}`}} 
            >
                Request Scoop
            </Button>
        </form>
    )
}

export default PassengerMap;