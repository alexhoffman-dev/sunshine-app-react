import './App.css';
import React, { useState } from 'react';
import Header from './Header';
import LocationInput from './LocationInput';
import CoordDisplay from './CoordDisplay';
import cloudy from './img/Cloudy.jpeg';
import sunny from './img/Sunny.png';


function App() {
  const [ userCoords, setUserCoords ] = useState('');
  const [ backgroundImage, setBackgroundImage ] = useState(cloudy);
  const [ backgroundColor, setBackgroundColor ] = useState('rgb(103, 104, 105)');

  function transitionBackground() {
    setBackgroundImage(sunny);
    setBackgroundColor('white');
  }

  return (
    <div className='parentContainer' style={{backgroundSize: '1500px', backgroundColor: backgroundColor, backgroundImage: `url(${backgroundImage})`}}>
      <Header/>
      { userCoords ? <CoordDisplay userCoords={ userCoords } transitionBackground={ transitionBackground }/> 
      :<LocationInput setUserCoords={ setUserCoords }/> }     
    </div>
  )
}

export default App;
