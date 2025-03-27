import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import "./App.css";
import Nav from "./Nav.js";
import axios from "axios";

const customIcon = new Icon({
  iconUrl: "/location1.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -40],
});

function App() {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [map, setMap] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api")
      .then((response) => {
        setLocations(response.data);
        setFilteredLocations(response.data);
      })
      .catch((error) => console.error("Error fetching locations:", error));
  }, []);

  const handleSearch = (query, filters) => {
    setSelectedFilters(filters);
    let filtered = locations;

    if (query) {
      filtered = filtered.filter(
        (loc) =>
          loc.name.toLowerCase().includes(query.toLowerCase()) ||
          (loc.organiser &&
            loc.organiser.toLowerCase().includes(query.toLowerCase())) ||
          (loc.country &&
            loc.country.toLowerCase().includes(query.toLowerCase()))
      );
    }

    const targetAudienceFilters = filters.filter((f) =>
      ["Children", "Adults", "Seniors", "Unspecified"].includes(f)
    );
    const statusFilters = filters.filter((f) =>
      ["Ongoing", "Upcoming", "Finished"].includes(f)
    );

    if (targetAudienceFilters.length > 0) {
      filtered = filtered.filter(
        (loc) =>
          loc.target_audience &&
          targetAudienceFilters.includes(loc.target_audience)
      );
    }

    if (statusFilters.length > 0) {
      filtered = filtered.filter(
        (loc) => loc.status && statusFilters.includes(loc.status)
      );
    }

    setFilteredLocations(filtered);
  };
  return (
    <div className="container">
      <Nav
        onSearch={handleSearch}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />

      <div className="map">
        <MapContainer
          center={[47.67572320170246, 15.492752747581674]}
          zoom={5}
          minZoom={3}
          maxZoom={15}
          zoomControl={false}
          whenCreated={setMap}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredLocations.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.latitude, loc.longitude]}
              icon={customIcon}
              eventHandlers={{
                click: () => setActivePopup(loc.id),
              }}
            >
              {activePopup === loc.id && (
                <Popup onClose={() => setActivePopup(null)}>
                  <div className="popUpContainer">
                    <h3 className="campaignTitle">{loc.name}</h3>

                    <h2 className="statusText">
                      <span
                        className={`status ${
                          loc.status?.toLowerCase() || "default"
                        }`}
                      >
                        {loc.status || "N/A"}
                      </span>
                    </h2>

                    <div className="campaignInfoContainer">
                      <div className="infoRow">
                        <span className="infoLabel">Organiser: </span>
                        <span className="infoValue">
                          {loc.organiser || "N/A"}
                        </span>
                      </div>
                      <hr className="popup-divider" />

                      <div className="infoRow">
                        <span className="infoLabel">Funding:</span>
                        <span className="infoValue">
                          {loc.funding || "N/A"}
                        </span>
                      </div>
                      <hr className="popup-divider" />

                      <div className="infoRow">
                        <span className="infoLabel">Start Date:</span>
                        <span className="infoValue">
                          {loc.start_date || "N/A"}
                        </span>
                      </div>
                      <div className="infoRow">
                        <span className="infoLabel">End Date:</span>
                        <span className="infoValue">
                          {loc.end_date || "N/A"}
                        </span>
                      </div>
                      <hr className="popup-divider" />

                      <div className="infoRow">
                        <span className="infoLabel">Target Audience: </span>
                        <span className="infoValue">
                          {loc.target_audience || "N/A"}
                        </span>
                      </div>
                      <hr className="popup-divider" />
                    </div>

                    {loc.info && (
                      <button
                        className="moreInfoButton"
                        onClick={() => window.open(loc.info, "_blank")}
                      >
                        Learn More
                      </button>
                    )}
                    <button
                      className="closeButton"
                      onClick={() => setActivePopup(null)}
                    >
                      Close
                    </button>
                  </div>
                </Popup>
              )}
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
