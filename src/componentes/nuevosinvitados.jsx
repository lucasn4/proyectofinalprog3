import React, { useState } from 'react';
import '../css/style.css';
import DecoracionCorta from './decoracioncorta.jsx';
import Subtitulo from './subtitulo.jsx';
import Trabajoporvoz from './trabajoporvoz.jsx';

export const App = () => {
    // Declara estados: nombre,ubicacion,capacidad,precio,telefono, inicializados con valores vacíos.
    const [nombre, setNombre] = useState("");
    const [apellido,setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");

  // Función para manejar el envío del formulario.
  const guardarbd = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario (enviar a una nueva página).

    try {
    // Realiza una solicitud POST al servidor.
    let response = await fetch('http://localhost:3001/register', { //fetch: fetch es una API moderna de JavaScript que se utiliza 
    //para realizar solicitudes HTTP. En este caso, se está utilizando para enviar una solicitud POST al servidor.
    //'http://localhost:5173/register': Esto es la URL del endpoint al que se enviará la solicitud POST. En este caso, 
    //el servidor está configurado para escuchar en el puerto 5000 y manejar las solicitudes que llegan a la ruta /register.
      method: "post",
      body: JSON.stringify({ nombre, apellido, email, telefono }), // Convierte los datos a formato JSON y los envía al servidor.
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
    setApellido("");
    setEmail("");
    setTelefono("");
  } 
  catch (error) {
    alert("Error al guardar los datos");
    console.error(error);
    }}
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
        <div className='subtitulo'>
          <Subtitulo />
        </div>
        
  <DecoracionCorta />
        <div>
            <h1 className='titulover'>Agregar Invitados</h1>
            <input type='text' placeholder='nombre' className='a'
            value={nombre} onChange={(e) => setNombre(e.target.value)}/>
            <input type='text' placeholder='apellido' className='a'
            value={apellido} onChange={(e) => setApellido(e.target.value)}/>
            <input type='text' placeholder='email' className='a'
            value={email}// Asigna el valor del estado 'email' al campo de entrada.
             onChange={(e) => setEmail(e.target.value)}//Actualiza el estado 'email' al escribir en el campo.
             />
            <input type='text' placeholder='telefono' className='a'
            value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
            <button type='submit' className='a'
            onClick={guardarbd}>Guardar</button>
        </div>
        <Trabajoporvoz />
      </>
    );
  }
  
  export default App;
  