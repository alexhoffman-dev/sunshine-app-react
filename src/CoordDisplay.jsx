import React, { useState } from 'react';
import { MapContainer, useMap, TileLayer, Marker, Popup, Circle, Tooltip } from 'react-leaflet'; 

// this component replaces the Location Input Component with a display of the users coordinates 
// we want to use the leaflet library here to display the users location on a leaflet map comp

const CoordDisplay = ({userCoords}) => { 
    const [ sunnyCoords, setSunnyCoords  ] = useState(''); 
    const [ sunnyCoordMapCenter, setSunnyCoordMapCenter ] = useState(''); 
    const weatherAPI = 'https://api.weather.gov/points/'; 
    const orangeFill = { color: 'orange', opacity: .25 };

    async function initSunshineSearch() {
        //transition background 
        let isSunny = await isSunnyAtCoords();
        if (isSunny) {
            console.log('its sunny at your coords')
            return;
        } 
        let X = parseFloat(userCoords.Latitude);
        let Y = parseFloat(userCoords.Longitude); 
        let pathDistance = 1;
        let stepAmount = 0; 
        let isPositive = true; 
        let changeY = false;
        let timer = 0;  
        // this logic takes our starting X, Y coordinates and increments on them .5 degrees of lat/long at a time
        // in an Ulam Spiral shape to find a truthy 'SUN' value in that points' forecast JSON
        // Timer initially set to 25 based on corner location of ulam sprial model 
        // The radius checked at that position is about 97.5 miles or 157.1km
        while (timer < 25 && !isSunny) {
            if (!changeY) {
                X = isPositive ? X + 0.5 : X - 0.5;
                stepAmount++
            } else {
                Y = isPositive ? Y + 0.5 : Y - 0.5;
                stepAmount++
            }
            isSunny = await isSunnyAtCoords(X , Y);
            if (stepAmount === pathDistance) {
                if (changeY) {
                    pathDistance++; 
                    isPositive = !isPositive; 
                }
                stepAmount = 0; 
                changeY = !changeY; 
            }
            timer++;
            if (isSunny) {
                setSunnyCoords({Latitude: X, Longitude: Y});
                findMapCenter(X, Y);
            };
            if (timer === 25) {
                // here we could institute a 'want to extend your search?'
                setSunnyCoords('No sun within a 97.5mi radius.')
            }
        }
    }
    async function isSunnyAtCoords(lat = userCoords.Latitude, long = userCoords.Longitude) {
        let response = await fetch(`${weatherAPI}${lat},${long}`);
        let parsedResponse = await response.json();
        let userLocationForecastURL = parsedResponse.properties.forecast // url for next api crunch 
        if (userLocationForecastURL == null) {
            console.log('API return is null @ properties.forecast object')
            debugger;
        }
        if (response.status != 200) {
            console.log('status is not 200');
            debugger;
        };
        return isSunnyAtGridPoint(userLocationForecastURL);
    }

    async function isSunnyAtGridPoint(forecastURL, tries = 1) {
        let response = await fetch(forecastURL);
        let parsedResponse = await response.json();
        if (response.status != 200) {
            if (response.status == 500) {
                tries++;
                if (tries < 10 ) {
                    return isSunnyAtGridPoint(forecastURL);
                } else {
                    console.error('fetch failed 10 times');
                    return false;
                }
            }
            if (parsedResponse.title === "Marine Forecast Not Supported") {
                console.error('search wandered into the ocean');
                return false;
            }
        }
        console.log(parsedResponse);
        // [0] index of parsedResponse accesses the current weather data, where [1] returns weather data for 
        // the next time period ie. this afternoon, evening, or tonight. 
        let currentForecast = parsedResponse.properties.periods[0].detailedForecast.toUpperCase();
        let isSunny = currentForecast.includes("SUN");
        return isSunny;
    }
    function findMapCenter(sunnyLat, sunnyLong) { 
        let averageLatitude = parseFloat(userCoords.Latitude)/2 + parseFloat(sunnyLat)/2;
        let avergeLongitude = parseFloat(userCoords.Longitude)/2 + parseFloat(sunnyLong)/2; 
        // map.setView(averageLatitude, avergeLongitude); 
    }

    return (
        <>
            <MapContainer center={[userCoords.Latitude, userCoords.Longitude]} zoom={12} scrollWheelZoom={false}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                <Marker position={[userCoords.Latitude, userCoords.Longitude]}>
                    <Popup>
                    You are here! <br/> Press the button below to find the closest sun!
                    </Popup>
                </Marker>
                {sunnyCoords && 
                    <div>
                        <Marker position={[sunnyCoords.Latitude, sunnyCoords.Longitude]}>
                        <Popup> <a href={`https://www.google.com/maps/search/?api=1&query=${sunnyCoords.Latitude}%2C${sunnyCoords.Longitude}`}>Directions to the sunshine!</a><br/><a href={`https://forecast.weather.gov/MapClick.php?lat=${sunnyCoords.Latitude}&lon=${sunnyCoords.Longitude}`}> Weather @ location</a> </Popup>
                        </Marker>
                    </div>
                }
                {sunnyCoords === 'No sun within a 97.5mi radius.' && <Circle center={[userCoords.Latitude, userCoords.Longitude]} color={ orangeFill } radius={97.5}><Tooltip>No sun within a 97.5 mile radius.</Tooltip></Circle>}
            </MapContainer>                
            <button onClick={ initSunshineSearch }>
                Find the Sun! 
            </button>
        </>
  )
}

export default CoordDisplay; 