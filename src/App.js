import React, { useEffect, useState, useRef } from 'react';
import Mapbox, { Marker } from 'mapbox-gl';

function App() {

  let map;
  const mapElement = useRef(null);


  Mapbox.accessToken = process.env.MAPBOX_API_KEY;

  const [longitude, setLongitude] = useState(12.377494305521509);
  const [langitude, setLangitude] = useState(56.047455233646566);
  const [inputData, setInputData] = useState('');
  const [info, setInfo] = useState('');
  

  useEffect(() => {
    map = new Mapbox.Map({
      container: mapElement.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: 17,
      center: [longitude, langitude]
    });

    //------------------------------------------------------------------

    // MARKERS FOR EACH ANIMAL

    // BAT
    const batMarker = new Mapbox.Marker;
      batMarker.setLngLat([12.378475332168, 56.047321016463]);
      batMarker.addTo(map);

    // MOTH
    const mothMarker = new Mapbox.Marker;
    mothMarker.setLngLat([12.379846219272002, 56.04709317869029])
    mothMarker.addTo(map)

    // BADGER
    const badgerMarker = new Mapbox.Marker;
    badgerMarker.setLngLat([12.380466580627711, 56.048016754614196])
    badgerMarker.addTo(map)

    //------------------------------------------------------------------

    // CUSTOM MARKER
    const newMarker = new Marker({ draggable: true });
    newMarker.setLngLat([longitude, langitude])
    newMarker.addTo(map)

    const showInfo = () => {
      const pos = newMarker.getLngLat();
      const getPlacement = [pos.lng, " ", pos.lat]
      setInfo(getPlacement)
    }
    newMarker.on('dragend', showInfo)
  }, []);

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

   // GO TO LOCATION ON COORDINATES INPUT


    const inputLongitude = (event) => {
      event.preventDefault();
      setInputData(event.target.value)
    }
    
  //   const inputLatitude = (event) => {
  //     event.preventDefault();
  //     setLangitude(event.target.value)
  //   }
  // }
  
  
  // BRUGERENS NUVÆRENDE POSITION
  const getMyPosition = () => {
    navigator.geolocation.getCurrentPosition(myPos => {
      map.flyTo({
        center: [myPos.coords.longitude, myPos.coords.latitude],
        zoom: 20
      })
    });
  }

  // navigator.geolocation.getCurrentPosition(minpos => {
  
  //   map.flyTo(
  //     {
  //       center: [minpos.coords.longitude, minpos.coords.latitude],
  //       zoom: 17
  //     }
  //   )
    
  // });


  return (
    <>
      <h1>Nocturnal Animals</h1>
      <h2>Press on the desired animal to see were it lives</h2>
      
      <form>
        <label htmlFor="form">Do you know the location of a specific animal? Type in the latitudes and longitudes in the field below and press go.</label> <br/>
        <input type="text" placeholder="Eg: -40(latitude)"/>
        <input type="text" placeholder="Eg: -70 (longitude)"/>
        <button type="submit" onClick={event => inputLongitude(event), event => inputLatitude(event)}>GO</button>

      </form>
      
      <br/>
      <br/>

      <button onClick={batsHabitat}>Bat</button>
      <button onClick={mothsHabitat}>Moth</button>
      <button onClick={badgersHabitat}>Badger</button>
      <br/>
      <button onClick={getMyPosition}>Her er du</button>
      
      <div style={{height: '400px'}} ref={mapElement}></div>

      <p>Her er den: {info}</p>      
    </>
  )
};

export default App;