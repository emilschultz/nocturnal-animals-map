import React, { useEffect, useState, useRef } from 'react';
import Mapbox, { Marker } from 'mapbox-gl';
// STYLES
import GlobalStyle from './components/GlobalStyle';
import InputField from './components/inputField';

export const geoJson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            12.378442883491514,
            56.04747411680988
          ],
          [
            12.37809419631958,
            56.04724192157593
          ],
          [
            12.378542125225067,
            56.04707713701363
          ],
          [
            12.378896176815031,
            56.04733479983721
          ],
          [
            12.37845629453659,
            56.04748610104211
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            12.379963696002958,
            56.04724341961418
          ],
          [
            12.379301190376282,
            56.04724341961418
          ],
          [
            12.379223406314848,
            56.046891379026775
          ],
          [
            12.380502820014952,
            56.04684943355111
          ],
          [
            12.380500137805937,
            56.04723592942236
          ],
          [
            12.380296289920805,
            56.04733330180252
          ],
          [
            12.380001246929169,
            56.047247913728555
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            12.380148768424988,
            56.04832199205295
          ],
          [
            12.380103170871735,
            56.04791004086135
          ],
          [
            12.381066083908081,
            56.04781866200091
          ],
          [
            12.381143867969513,
            56.04843284362244
          ],
          [
            12.38017290830612,
            56.04833397602175
          ]
        ]
      }
    }
  ]
}

let map = null;
let marker = null;

function App() {

  const mapElement = useRef(null);

  Mapbox.accessToken = process.env.MAPBOX_API_KEY;

  const [longitude, setLongitude] = useState('');
  const [langitude, setLangitude] = useState('');
  const [info, setInfo] = useState('');
  


  useEffect(() => {
    map = new Mapbox.Map({
      container: mapElement.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: 17,
      center: [12.377494305521509, 56.047455233646566]
    })
      .on('click', event => handelMapClick(event))


      .on('load', () => {
        map.addSource('bat', {
          type: 'geojson',
          data: geoJson
        });

        map.addLayer({
          id: 'bat-layer',
          type: 'fill',
          source: 'bat',
          layout: {},
          paint: { 
            'fill-color': '#ffffff',
            'fill-opacity': 0.2
          }
        })
      })
      .on('load', () => {
        map.addSource('moth', {
          type: 'geojson',
          data: geoJson
        });

        map.addLayer({
          id: 'moth-layer',
          type: 'fill',
          source: 'moth',
          layout: {},
          paint: {
            'fill-color': '#ffffff',
            'fill-opacity': 0.2
          } 
        })
        .on('load', () => {
          map.addSource('badger', {
            type: 'geojson',
            data: geoJson
          });

          map.addLayer({
            id: 'badger-layer',
            type: 'fill',
            source: 'badger',
            layout: {},
            paint: {
              'fill-color': '#ffffff',
              'fill-opacity': 0.2
            }
          })
        })
      })

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
    // const newMarker = new Marker({ draggable: false });
    // newMarker.setLngLat([longitude, langitude])
    // newMarker.addTo(map)

    // const showInfo = () => {
    //   const pos = newMarker.getLngLat();
    //   const getPlacement = [pos.lng, " ", pos.lat]
    //   setInfo(getPlacement)
    // }
    // newMarker.on('dragend', showInfo)
  }, []);

  // GET LOCATION OF CURSORCLICK

  const handelMapClick = (event) => {
    let el = document.createElement('div');
    el.style.display = 'block';
    el.style.width = '40px';
    el.style.height = '40px';
    el.style.backgroundImage = 'url("https://www.svgrepo.com/show/315215/binocular.svg")';
    el.style.backgroundSize = '40px 40px';

    el.addEventListener('click', () => {
      console.log('hei')
    });

    const newMarker = new Mapbox.Marker(el)
      .setLngLat(event.lngLat);

    if(marker !== null){
      marker.remove();
    }

    newMarker.addTo(map);
    marker = newMarker;
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

   // GO TO LOCATION ON COORDINATES INPUT


  //   const inputLongitude = (event) => {
  //     event.preventDefault();
  //     setLongitude(event.target.value)
  //   }
    
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
  
  return (
    <>
      <GlobalStyle/>
      <h1>Nocturnal Animals</h1>
      <h2>Press on the desired animal to see were it lives</h2>
      <form>
        <label htmlFor="form">Do you know the location of a specific animal? Type in the latitudes and longitudes in the field below and press go.</label> <br/>
        <InputField type="text" name="longitudes" placeholder="Eg: -70 (longitude)"/>
        <InputField type="text" name="latitude" placeholder="Eg: -40(latitude)"/>
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

      <p>Dit dyr er på disse koordinater: {info}</p>      
    </>
  )
};

export default App;