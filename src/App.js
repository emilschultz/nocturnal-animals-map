import React, { useEffect, useState, useRef } from 'react';
import Mapbox from 'mapbox-gl';

function App() {
  Mapbox.accessToken = process.env.MAPBOX_API_KEY;

  let map;
  const mapElement = useRef(null);

  useEffect(() => {
    map = new Mapbox.Map({
      container: mapElement.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: 17,
      center: [12.377494305521509, 56.047455233646566]
    });
  }, []);

  // GO TO LOCATION ON COORDINATES INPUT

  // GO TO LOCATION ON BUTTON CLICK

  // Ændre denne til flyTo()!
  function batsHabitat() {
    map.setCenter([12.378475332168, 56.047321016463]),
    map.setZoom(18)
  }
  function mothsHabitat() {
    map.setCenter([12.37826979015567, 56.0477519437771]), 
    map.setZoom(18)
  }
  function badgersHabitat() {
    map.setCenter([12.380466580627711, 56.048016754614196]), 
    map.setZoom(18)
  }

  return (
    <>
      <h1>Nocturnal Animals</h1>
      <h2>Press on the desired animal to see were it lives</h2>

      <input type="text" placeholder="Ex: -40, 70 (lang, long)"/>
      <button>GO</button>
      <br/>
      <br/>

      <button onClick={batsHabitat}>Bat</button>
      <button onClick={mothsHabitat}>Moth</button>
      <button onClick={badgersHabitat}>Badger</button>
      
      <div style={{height: '720px'}} ref={mapElement}></div>
      
    </>
  )
};

export default App;