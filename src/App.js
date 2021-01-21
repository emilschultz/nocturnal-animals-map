import React, { useEffect, useState, useRef } from 'react';
import Mapbox from 'mapbox-gl';

function App() {

  let map;
  const mapElement = useRef(null);
  Mapbox.accessToken = process.env.MAPBOX_API_KEY;

  const [longitude, setLongitude] = useState(12.377494305521509);
  const [langitude, setLangitude] = useState(56.047455233646566);

  useEffect(() => {
    map = new Mapbox.Map({
      container: mapElement.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: 17,
      center: [longitude, langitude]
    });
  }, []);

  // GO TO LOCATION ON COORDINATES INPUT

  const inputLongitude = (event) => {
    event.preventDefault();
    setLongitude(event.target.value)
  }
  
  const inputLangitude = (event) => {
    event.preventDefault();
    setLangitude(event.target.value)
  }

  // GO TO LOCATION ON BUTTON CLICK
  const batsHabitat = () => {
    map.flyTo({
      center: [12.378475332168, 56.047321016463],
      zoom: 18
    })
  }
  
  const mothsHabitat = () => {
    map.flyTo({
      center: [12.379846219272002, 56.04709317869029],
      zoom: 18
    })
  }

  const badgersHabitat = () => {
    map.flyTo({
      center: [12.380466580627711, 56.048016754614196],
      zoom: 18
    })
  }
  return (
    <>
      <h1>Nocturnal Animals</h1>
      <h2>Press on the desired animal to see were it lives</h2>
      
      <form>
        <label htmlFor="form">Do you know the location of a specifik animal? Type in the langitudes and lingitudes in the field below and press go.</label> <br/>
        <input onSubmit={inputLangitude} type="text" placeholder="Ex: -40(langitude)"/>
        <input onSubmit={inputLongitude} type="text" placeholder="Ex: -70 (longitude)"/>
        <button>GO</button>

      </form>
      
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