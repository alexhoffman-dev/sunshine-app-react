import './App.css';
import React, { useState } from 'react';
import Header from './Header';
import LocationInput from './LocationInput';
import CoordDisplay from './CoordDisplay';


function App() {
  const [ userCoords, setUserCoords ] = useState('')

  return (
    <div className='parentContainer'>
      <Header/>
      { userCoords ? <CoordDisplay userCoords={ userCoords }/> 
      :<LocationInput setUserCoords={ setUserCoords }/> }     
    </div>
  )
}

export default App;
