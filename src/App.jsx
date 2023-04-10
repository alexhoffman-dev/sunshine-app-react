import './App.css';
import React, { useState } from 'react';
import Header from './Header';
import LocationInput from './LocationInput';
import CoordDisplay from './CoordDisplay';


function App() {
  const [ userCoords, setUserCoords ] = useState( {
    Latitude: null,
    Longitiude: null,  
})

  return (
    <div className='parentContainer'>
      <Header/>
      <LocationInput setUserCoords={ setUserCoords }/>
      <CoordDisplay userCoords={ userCoords }/>
    </div>
  )
}

export default App;
