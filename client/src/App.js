import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import './App.css';
import axios from 'axios';
import Nav from './Nav.js';

const customIcon = new Icon({
  iconUrl: '/location.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, 38]
});

function App() {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  // Fetch locations from backend
  useEffect(() => {
    axios.get('http://localhost:5001/api')
      .then(response => {
        setLocations(response.data);
        setFilteredLocations(response.data);
      })
      .catch(error => console.error("Error fetching locations:", error));
  }, []);

  // Search filter function
  const handleSearch = (query) => {
    if (!query) {
      setFilteredLocations(locations);
    } else {
      const filtered = locations.filter(loc =>
        loc.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  };

  return (
    <div className="app-container">
      <Nav onSearch={handleSearch} />

      <MapContainer
        center={[47.67572320170246, 15.492752747581674]}
        zoom={5}
        minZoom={3}
        maxZoom={15}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      
        {filteredLocations.map(loc => (
          <Marker key={loc.id} position={[loc.latitude, loc.longitude]} icon={customIcon}>
            <Popup>
              <div className="popup-content">
                <h3>{loc.name}</h3>
                <img src={"/popup.png"} alt={"popup"} />
                <h2> 
                <span className={`status ${loc.status?.toLowerCase() || "default"}`}>
                  {loc.status || "N/A"}
                </span>
                </h2>

                <p><strong>Organiser:</strong> {loc.organiser || "N/A"}</p>
                <p><strong>Funding:</strong> {loc.funding || "N/A"}</p>
                <p><strong>Duration:</strong> {loc.duration || "N/A"}</p>
                {/* style info */}
                <p><strong>Additional Info:</strong> {<a href="loc.info">{loc.info}</a> || "N/A"}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
