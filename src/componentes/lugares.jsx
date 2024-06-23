import React, { useState, useEffect } from 'react';
import '../css/style.css';
import Subtitulo from './subtitulo.jsx';
import DecoracionCorta from './decoracioncorta.jsx';
import Trabajoporvoz from './trabajoporvoz.jsx';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const App = () => {
    const [nombre, setNombre] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [capacidad, setCapacidad] = useState("");
    const [precio, setPrecio] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState(""); // Estado para la dirección ingresada
    const [marcadorCoordenadas, setMarcadorCoordenadas] = useState(null); // Estado para las coordenadas del marcador

    // Función para guardar en la base de datos
    const guardarbd = async (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario (enviar a una nueva página).
    
        try {
        // Realiza una solicitud POST al servidor.
        let response = await fetch('http://localhost:3000/register', { 
          method: "post",
          body: JSON.stringify({ nombre, ubicacion, capacidad, precio, telefono }), // Convierte los datos a formato JSON y los envía al servidor.
          headers: {
            'Content-Type': 'application/json' // Especifica el tipo de contenido de la solicitud como JSON.
          }
        });
    
        if (!response.ok) {
          throw new Error('Error al guardar los datos');
        }
    
        const data = await response.json();
        alert("Datos guardados correctamente");
        setNombre("");
        setUbicacion("");
        setCapacidad("");
        setPrecio("");
        setTelefono("");
      } 
      catch (error) {
        alert("Error al guardar los datos");
        console.error(error);
        }}

    // Función para buscar coordenadas según la dirección ingresada
    useEffect(() => {
        async function buscarCoordenadas(ubicacion) {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${ubicacion}`);
                if (!response.ok) {
                    throw new Error('Error al obtener las coordenadas');
                }
                const data = await response.json();
                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    console.log(`Coordenadas de ${ubicacion}: Latitud ${lat}, Longitud ${lon}`);
                    setMarcadorCoordenadas([lat, lon]);
                } else {
                    console.error('No se encontraron resultados para la dirección proporcionada.');
                }
            } catch (error) {
                console.error('Error al obtener las coordenadas:', error);
            }
        }

        if (direccion !== "") {
            buscarCoordenadas();
        }
    }, [direccion]);

    return (
        <>
            <style>
                {`
                body {
                    /*background-color: rgba(0, 0, 0, 0.5);*/
                }
                `}
            </style>
            <div className='bodytono'></div>
            <div className='subtitulo'>
                <Subtitulo />
                <DecoracionCorta />
            </div>
            <div>
                <h1 className='titulover'>Agregar Lugares</h1>
                <input type='text' placeholder='Nombre' className='a' value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <input type='text' placeholder='Ubicación' className='a' value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
                <input type='text' placeholder='Capacidad' className='a' value={capacidad} onChange={(e) => setCapacidad(e.target.value)} />
                <input type='text' placeholder='Precio' className='a' value={precio} onChange={(e) => setPrecio(e.target.value)} />
                <input type='text' placeholder='Teléfono' className='a' value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                <button type='submit' className='a' onClick={guardarbd}>Guardar</button>
            </div>
            <div>
                {/* Mapa Leaflet */}
                <MapContainer center={[-26.8184, -65.2649]} zoom={13} style={{ height: "400px", marginBottom: "20px" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/* Marcador */}
                    {marcadorCoordenadas && (
                        <Marker position={marcadorCoordenadas}>
                            <Popup>Coordenadas: {marcadorCoordenadas.join(', ')}</Popup>
                        </Marker>
                    )}
                </MapContainer>
                {/* Input para mostrar las coordenadas */}
                {marcadorCoordenadas && (
                    <input type='text' value={`Coordenadas: ${marcadorCoordenadas.join(', ')}`} readOnly style={{ width: "100%", padding: "10px", boxSizing: "border-box" }} />
                )}
            </div>
            <Trabajoporvoz
                setNombre={setNombre}
                setUbicacion={setUbicacion}
                setCapacidad={setCapacidad}
                setPrecio={setPrecio}
                setTelefono={setTelefono}
            />
            <div>
                {/* Input para ingresar dirección */}
                <input className='a'type="text" placeholder="Ingrese una dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} style={{ marginBottom: "10px" }} />
                {/* Botón para buscar la dirección */}
                <button id='btnmapa' onClick={() => setMarcadorCoordenadas(null)}>Buscar Dirección</button>
            </div>
        </>
    );
}

export default App;