import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useLocation, useNavigate } from 'react-router-dom';
import busIco from '../assets/Bus_2.ico';
import L from 'leaflet';
import { Button } from '@mui/material';

function Map() {
    const location = useLocation();

    const longi = location.state.props.longi;
    const lati = location.state.props.lati;

    console.log(longi);

    const navigate = useNavigate()

    const position = [lati, longi]; // Ensure correct order: [latitude, longitude]

    const customIcon = new L.Icon({
        iconUrl: busIco,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', height: '100vh' }}>
            <Button onClick = {navigate(-1)}></Button>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
                    {location.state.props.busno} | 
                    <label style={{ fontSize: 20 }}>
                        {location.state.props.routeno} | 
                        Status: 🟢
                    </label>
                </div>

                <MapContainer center={position} zoom={8} style={{ height: '500px', width: '500px' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position} icon={customIcon}>
                        <Popup>
                            <div style={{ fontWeight: 'bold' }}>
                                {location.state.props.busno} is at: [{lati}, {longi}]
                            </div>
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
}

export default Map;
