import React, {useEffect, useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import './App.css';
import axios from 'axios';

const customIcon = new Icon({
  iconUrl: '/location.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  // popupAnchor: [0, -38]
})
function App() {
  const [locations, setLocations] = useState([]);

  // Fetch locations from backend
  useEffect(() => {
    axios.get('http://localhost:5001/api')
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => console.error("Error fetching locations:", error));
  }, []);
  return (
      <MapContainer
  center={[47.67572320170246, 15.492752747581674]}
  zoom={5}
  minZoom={3}
  maxZoom={15}
>
  <TileLayer
    attribution='&copy; OpenStreetMap contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  {locations.map(loc => (
    <Marker key={loc.id} position={[loc.latitude, loc.longitude]} icon={customIcon}>
      <Popup>{loc.name}</Popup>
    </Marker> 
  ))}
</MapContainer>
  );
}

export default App;
