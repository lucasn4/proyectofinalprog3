import React, { useState, useEffect } from 'react';
import '../css/style.css';
import Paneltitulo from './paneltitulo.jsx';
import Subtitulo from './subtitulo.jsx';
import Trabajoporvoz from './trabajoporvoz.jsx';

export const App = () => {
    const [nombre, setNombre] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [capacidad, setCapacidad] = useState("");
    const [precio, setPrecio] = useState("");
    const [telefono, setTelefono] = useState("");
    const direccion = "San Martin 1200"; // Asigna la dirección a una variable
    let vari;
    ///////////////////////////////////////////////////
    ///////// buscar coordenadas de ubicacion //////////////
    const [coordenadas, setCoordenadas] = useState(null);
    useEffect(() => {
        async function buscarCoordenadas() {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${direccion}`);
                if (!response.ok) {
                    throw new Error('Error al obtener las coordenadas');
                }
                const data = await response.json();
                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    console.log(`Coordenadas de ${direccion}: Latitud ${lat}, Longitud ${lon}`);
                    setCoordenadas([lat, lon]);
                } else {
                    console.error('No se encontraron resultados para la dirección proporcionada.');
                }
            } catch (error) {
                console.error('Error al obtener las coordenadas:', error);
                // Puedes implementar un manejo de reintentos aquí si es necesario
            }
        }
    
        buscarCoordenadas();
    }, [direccion]);
    /////////////////////////////////////////////////
    const guardarbd = async (e) => {
        e.preventDefault();

        try {
            let response = await fetch('http://localhost:3000/register', { // Modificado para enviar la solicitud al puerto 3000
                method: "post",
                body: JSON.stringify({ nombre, ubicacion, capacidad, precio, telefono }),
                headers: {
                    'Content-Type': 'application/json'
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
        } catch (error) {
            alert("Error al guardar los datos");
            console.error(error);
        }
    };

    return (
        <>
            <style>
                {`
                body {
                    /*background-color: rgba(0, 0, 0, 0.5);
                }
            `}
            </style>
            <div className='bodytono'></div>
            <div className='paneltitulo'>
                <Paneltitulo />
            </div>
            <div className='subtitulo'>
                <Subtitulo />
            </div>
            <div>
                <h1>Agregar Lugares</h1>
                <input type='text' placeholder='nombre' className='a' id='cajanombre'
                    value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <input type='text' placeholder='ubicacion' className='a' id='cajaubicacion'
                    value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
                <input type='text' placeholder='capacidad' className='a' id='cajacapacidad'
                    value={capacidad} onChange={(e) => setCapacidad(e.target.value)} />
                <input type='text' placeholder='precio' className='a' id='cajaprecio'
                    value={precio} onChange={(e) => setPrecio(e.target.value)} />
                <input type='text' placeholder='telefono' className='a' id='cajatelefono'
                    value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                <button type='submit' className='a'
                    onClick={guardarbd}>Guardar</button>
            </div>
            <Trabajoporvoz 
                setNombre={setNombre} 
                setUbicacion={setUbicacion} 
                setCapacidad={setCapacidad} 
                setPrecio={setPrecio} 
                setTelefono={setTelefono} 
            />
            {coordenadas ? (
              <p>Coordenadas: {coordenadas.join(', ')}</p>
            ) : (
              <p>Buscando coordenadas...</p>
            )}
        </>
    );
}

export default App;