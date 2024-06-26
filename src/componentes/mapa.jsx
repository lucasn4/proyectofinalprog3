//npm install react-leaflet
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet
import '../css/map.css';

export const mapa = () => {
    const position = [-26.8184, -65.2649];
    //const position2 = [-26.84, -65.30];
    const [direccion, setDireccion] = useState(""); // Inicializa como una cadena vacía en lugar de null
    const [coordenadas, setCoordenadas] = useState(null); // Estado para almacenar las coordenadas de la dirección
    //const [position2, setPosition2] = useState("");

  return (
    <>
        <input id='inputmapa' type="text"  placeholder="Ingrese una dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)}/>
        {/* Botón para buscar la dirección */}
        <button id='btnmapa'>Buscar Dirección</button>
    
        <MapContainer id="mapacontenedor" center={position} zoom={13} style={{ height: "400px"}}>
        <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
        <Marker position={position}>
                <Popup>
                <h5>Mapa</h5> <br /> Easily customizable.
                </Popup>
        </Marker>
            
        </MapContainer>
    </>
  )
}

export default mapa;