import React, {useState} from 'react'
import PlacesAutocomplete, {geocodeByAddress, getLatLng,} from 'react-places-autocomplete'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const AddressSearch = () => {
    const arr = ['']
    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);
    const [address, setAddr] = useState<string | null>(arr[0])
    const [suggestedPlaces, setSuggestedPlaces] = useState<Array<string>>([])
    const autocompleteService = new google.maps.places.AutocompleteService()
    
    const handleInputChange = (event, inputVal) => {

        setAddr(inputVal)
        if(inputVal.length > 0){
            autocompleteService.getPlacePredictions(
                {input: inputVal},
                handleAutoCompletePredictions
            )
        }else{
            setSuggestedPlaces([])
        }

    }

    const handleAutoCompletePredictions = (
        predictions: google.maps.places.AutocompletePrediction[],
        status: google.maps.places.PlacesServiceStatus
    ) => {
        if(status == google.maps.places.PlacesServiceStatus.OK){
            // setSuggestedPlaces(predictions)
            
            predictions.map(prediction => {
                arr.push(prediction.description)
            })

            setSuggestedPlaces(arr)
        }else{
            // setSuggestedPlaces([])
            console.error("Invalid Entry")
        }
    }

    const handleChange = (event, val) =>{
        setAddr(val)
        if(val){
            geocodeByAddress(val)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                setLat(latLng.lat); 
                setLng(latLng.lng); 
                sessionStorage.setItem('latitude', latLng.lat); 
                sessionStorage.setItem('longitude', latLng.lng); 
                console.log(latLng.lat,latLng.lng)})
            .catch(error => console.error('Error', error));
        }
    }

    

    return(
        <>
            <Autocomplete
            disablePortal
            // value={address}
            onChange={handleChange}
            onInputChange={handleInputChange}
            id="combo-box-demo"
            options={suggestedPlaces}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="Address" />}/>
        
        </>
    )
}

export default AddressSearch