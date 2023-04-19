import React, { useState } from 'react';

const LocationInput = ({ setUserCoords }) => { 
    const [ locationServicesEnabled, setlocationServicesEnabled ] = useState(true);
    const [ locationIsFetching, setLocationIsFetching ] = useState(false); 
    const [ manulEntryLocation, setmanulEntryLocation ] = useState('')
    const geoCodingAPIkey = '121c73b526be40d5ae4173c60efd311a'; 
    const geoCodingAPIForwardEndpoint = `https://api.geoapify.com/v1/geocode/search?text=address&format=json&apiKey=${geoCodingAPIkey}`;

   
    async function geoLocateUser() {
        setLocationIsFetching(true); 
        navigator.geolocation.getCurrentPosition((position) => {
            setUserCoords({Latitude: position.coords.latitude, Longitude: position.coords.longitude});
          }, manaullyEnterLocation);
        }
    
    function manaullyEnterLocation() {
        setlocationServicesEnabled(false);

    }

    function handleChange(event) {
        setmanulEntryLocation(event.target.value)
    }

    async function geocodeManualInput() {
        let searchValue = manulEntryLocation.toUpperCase().replaceAll(' ','%20');
        let sanitizedQuery = searchValue.replaceAll(',','%2C');
        if (sanitizedQuery == '') {
            console.error('You need to enter a valid address')
            return
        } 
        let userAddress = geoCodingAPIForwardEndpoint.replace('address',`${sanitizedQuery}`);
        console.log(userAddress);
        let APISearch = await fetch(`${userAddress}`); 
        let APIResults = await APISearch.json();
        console.log(APIResults);
        setUserCoords({
                        Latitude: APIResults.results[0].lat, 
                        Longitude: APIResults.results[0].lon});
    }

    return (
        <>
            { locationServicesEnabled ?
            <div className={'container'}>
                <h2>What is your current location?</h2>
                { locationIsFetching ? <p>Finding your location...</p> 
                : <button className='geolocateButton' onClick={ geoLocateUser }> Find Me! </button> }
            </div>
            :
            <div className={'container'}>
                <h2>Please enter your address below: </h2>
                <p>Example: 1234 Drury Ln Pittsburgh PA 15106 </p>
              <input type="search" placeholder="street, city, state, zip" id="adress-input" onChange={ handleChange } required/>
              <button className='geolocate-button' onClick={ geocodeManualInput } >Find</button>
            </div>
            }
        </>
    )
}

export default LocationInput; 