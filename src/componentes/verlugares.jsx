import React, { useState, useEffect } from 'react'; // Importamos React, useState y useEffect desde la librería 'react'
import '../css/style.css'; // Importamos el archivo CSS para estilos
import { Link } from 'react-router-dom'; // Importamos Link de react-router-dom para manejar enlaces internos
import Paneltitulo from './paneltitulo.jsx';
import Subtitulo from './subtitulo.jsx';
import Trabajoporvoz from './trabajoporvoz.jsx';
import Mapa from './mapa.jsx';

export const App = () => {
  // Declara estados: nombre,ubicacion,capacidad,precio,telefono, inicializados con valores vacíos.
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [telefono, setTelefono] = useState("");

  // Estado para almacenar el documento de la API
  const [documento, setDocumento] = useState(null);

  // Función para manejar el envío del formulario.
  const verbd = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario (enviar a una nueva página).

  };

  // Función para cargar el documento al renderizar el componente
  useEffect(() => {
    const fetchDocumentos = async () => {
        try {
            const response = await fetch('http://localhost:3000/register');
            if (!response.ok) {
                throw new Error('Error al recuperar los documentos');
            }
            const data = await response.json();
            setDocumento(data.data); // Establecer los documentos en el estado
            
          } catch (error) {
            console.log(error);
            // Manejar el error aquí
        }
    };

    fetchDocumentos();
}, []);

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
            <h1 className='titulover'>Ver Lugares</h1>
            <table id='verlugares' className='tablaarayas' style={{width:"90%"}}>
              <thead>
                <tr>
                  <th className='columna'>Nombre</th>
                  <th className='columna'>Ubicacion</th>
                  <th className='columna'>Capacidad</th>
                  <th className='columna'>Precio</th>
                  <th className='columna'>Telefono</th>
                </tr>
              </thead><tbody>
    {documento && documento.map(doc => (
        <tr key={doc._id}>
            <td className='columna'>{doc.nombre}</td>
            <td className='columna'>{doc.ubicacion}</td>
            <td className='columna'>{doc.capacidad}</td>
            <td className='columna'>{doc.precio}</td>
            <td className='columna'>{doc.telefono}</td>
        </tr>
    ))}
</tbody>
            </table>
        </div>
      <div>
        <Trabajoporvoz />
        <Mapa/>
      </div>
      </>
    );
  }
  
  export default App;
  