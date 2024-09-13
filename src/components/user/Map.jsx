import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { topParties } from '../mockData'; // Import top parties data
import L from 'leaflet';

// Define custom marker icon (optional)
const customIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    shadowSize: [41, 41]
});

const Map = () => {
    return (
        <MapContainer center={[-30, 24]} zoom={5} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {topParties.map((party, index) => (
                <Marker 
                    key={index} 
                    position={party.location} 
                    icon={customIcon} // Apply custom icon
                >
                    <Popup>
                        <strong>{party.name}</strong><br />
                        Votes: {party.votes}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
