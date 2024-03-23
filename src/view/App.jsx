import { useState, useRef, useEffect } from "react";
import TopBar from "./TopBar";
import GoogleMap from "./GoogleMap";

// utility function
const log = (...args) => console.log.apply(null, ["App -->", ...args]);

export default function App() {

  const [latlng, setLatlng] = useState({
    lat: -34.397,
    lng: 150.644,
  });

  const [zoom, setZoom] = useState(8);
  const [markerReady, setMarkerReady] = useState(false);
  
  // UI elements refs
  const zoomInput = useRef(null);
  const markerTitleInput = useRef(null);
  const markerTypeInput = useRef(null);

  // Values refs
  const markerTitle = useRef("");
  const markerType = useRef("");
  

  

  function reposition(event) {
    const {city} = event.target.dataset
    log(city)
    switch (city) {
      case "tel aviv":
        setLatlng({ lat: 32.0042938, lng: 34.7615399 });
        break;
      case "london":
        setLatlng({ lat: 51.528308, lng: -0.3817828 });
        break;
      case "paris":
        setLatlng({ lat: 48.8587741, lng: 2.2069754 });
        break;
      default:
        alert("Location not supported");
    }
  }
  function onZoomChange(){
    setZoom(Number(zoomInput.current.value))
  }
  function locateMe() {
    if ("geolocation" in navigator) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          log({ position });

          // const lat = position.coords.latitude;
          // const lng = position.coords.longitude;

          const { latitude: lat, longitude: lng } = position.coords;

          setLatlng({ lat, lng });
          setZoom(18);
        },
        (error) => {
          log(`ERROR(${error.code}): ${error.message}`);
        }
      );
    } else {
      alert("geolocation IS NOT available in your browser :(");
    }
  }

  function addMarker() {
    setMarkerReady(true);
  }
  useEffect(()=> {
    if(markerReady === true) {
      setMarkerReady(false);
      markerTitleInput.current.value = ""
      markerTypeInput.current.value = "None"
    }
  },[markerReady])

  function updateField(event) {
    const val = event.target.value;
    switch (event.target.name) {
      case "markerTitle":
        markerTitle.current = val;
        break;
      case "markerType":
        markerType.current = val;
        break;
      default:
        log("Field not supported");
    }
    /* another solution...
       although it works, eval is considered risky and a bad practice. 
       -----------------------------------------------------------------*/
    // eval(`${event.target.name}.current = "${event.target.value}"`)
  }
  return (
    <div className="app">
      <TopBar>Google Maps Example in React</TopBar>
      <div className="hbox mb20">
        <button data-city="tel aviv" onClick={reposition}>
          Tel Aviv
        </button>
        <button data-city="paris" onClick={reposition}>
          Paris
        </button>
        <button data-city="london" onClick={reposition}>
          London
        </button>
        <input
          ref={zoomInput}
          type="number"
          min="8"
          max="16"
          placeholder="8"
          onChange={onZoomChange}
        />
        <button onClick={locateMe}>locate me</button>
      </div>
      <div className="controls-box mb20">
        <span>Title: &nbsp;</span>
        <input
          ref={markerTitleInput}
          name="markerTitle"
          type="text"
          className="title-input"
          onChange={updateField}
        />
        <select
          ref={markerTypeInput}
          name="markerType"
          className="type-selector"
          onChange={updateField}
        >
          <option value="None">Type:</option>
          <option value="Barbecue">Barbecue </option>
          <option value="Buffet">Buffet </option>
          <option value="Brasserie">Brasserie</option>
          <option value="Cafe">Cafe</option>
          <option value="Casual">Casual</option>
          <option value="Chef">Chef</option>
          <option value="Diner">Diner</option>
          <option value="Ethnic">Ethnic</option>
          <option value="Fast food">Fast food</option>
          <option value="Kosher">Kosher</option>
          <option value="Pub">Pub</option>
        </select>
        <button onClick={addMarker}>Add Marker</button>
      </div>
      <GoogleMap
        lat={latlng.lat}
        lng={latlng.lng}
        zoom={zoom}
        markerTitle={markerTitle.current}
        markerType={markerType.current}
        markerReady={markerReady}
      />
    </div>
  );
}
