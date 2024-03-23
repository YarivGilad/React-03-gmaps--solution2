import { useEffect, useRef } from "react";
const log = (...args) => console.log.apply(null, ["GoogleMap -->", ...args]);

export default function GoogleMap({ lat, lng, zoom, markerReady, markerTitle, markerType }) {
  const map = useRef(null);
  const mapDiv = useRef(null);

  async function createMap() {
    const { Map } = await google.maps.importLibrary("maps");

    map.current = new Map(mapDiv.current, {
      center: { lat, lng },
      zoom: 8,
      mapId: '6ce349c66c9fc06c'
    });
  }

  useEffect(() => {
    createMap();
  }, []);

  useEffect(() => {
    if (!map.current) return;
    map.current.setCenter({ lat, lng });
  }, [lat, lng]);

  useEffect(() => {
    if (!map.current) return;
    map.current.setZoom(zoom);
  }, [zoom]);

  async function addMarker() {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const marker = new AdvancedMarkerElement({
      position: map.current.getCenter(),
      map: map.current,
      title: markerTitle
    });
    const { InfoWindow } = await google.maps.importLibrary("maps");
    const infoWindow = new InfoWindow({
      content: `
        <div style="text-align:center">
            <h2>${markerTitle}</h2>
            <h3>Type: ${markerType}</h3>
            <br/>
            <img src="https://picsum.photos/200/100?random"/>
            <br/>
            <br/>
            <p>Macaroon halvah cotton candy tiramisu I love.<br/> 
            Croissant halvah bonbon powder gingerbread <br/>
            jujubes icing apple pie. Pastry pudding toffee.</p>
            <br/>
        </div>`,
    });
    marker.addListener("click", function () {
      infoWindow.open(map.current, marker);
    });
  }
  useEffect(() => {
    if (!map.current || !markerReady) return;
    addMarker();
  }, [markerReady]);

  return <div ref={mapDiv} className="map-box" />;
}
