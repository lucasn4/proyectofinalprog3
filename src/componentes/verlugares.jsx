import React, { useState, useEffect } from 'react'; // Importamos React, useState y useEffect desde la librería 'react'
import '../css/style.css'; // Importamos el archivo CSS para estilos
import { Link } from 'react-router-dom'; // Importamos Link de react-router-dom para manejar enlaces internos
import Subtitulo from './subtitulo.jsx';
import DecoracionFondo from './decoracionfondo.jsx';
import Trabajoporvoz from './trabajoporvoz.jsx';
import Mapa from './mapa.jsx';
import axios from 'axios';

export const App = () => {
  // Declara estados: nombre,ubicacion,capacidad,precio,telefono, inicializados con valores vacíos.
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [telefono, setTelefono] = useState("");

  const [documentos, setDocumentos] = useState([]);
  const [selectedRange, setSelectedRange] = useState('');

  // Estado para almacenar el documento de la API
  const [documento, setDocumento] = useState([]);
  const [showTable, setShowTable] = useState(false);

///////////////filtro////////////////////////
  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
};

  // Función para cargar el documento al renderizar el componente
//  useEffect(() => {
    const fetchDocumentosporrango = async () => {
        try {
          let minPrecio = 0;
          let maxPrecio = 0;
          const response = await fetch('http://localhost:3000/register');
          if (!response.ok) {
              throw new Error('Error al recuperar los documentos');
          }
          const data = await response.json();
          setDocumento(data.data); // Establecer los documentos en el estado

          // Determinar el rango de precios según selectedRange
          switch (selectedRange) {
              case '0-100':
                  minPrecio = 0;
                  maxPrecio = 100;
                  fetchDocumentos(minPrecio,maxPrecio,data);
                  break;
              case '101-200':
                  minPrecio = 101;
                  maxPrecio = 200;
                  fetchDocumentos(minPrecio,maxPrecio);
                  break;
              case '201-300':
                  minPrecio = 201;
                  maxPrecio = 300;
                  fetchDocumentos(minPrecio,maxPrecio);
                  break;
              case '301-400':
                  minPrecio = 301;
                  maxPrecio = 40000;
                  fetchDocumentos(minPrecio,maxPrecio);
                  break;
              default:
                  break;
          }
            //const response = await fetch('http://localhost:3000/register/precio');
            //if (!response.ok) {
            //    throw new Error('Error al recuperar los documentos');
            //}
            //const data = await response.json();
            //setDocumentos(data.data); // Establecer los documentos en el estado
            
          } catch (error) {
            console.log(error);
            // Manejar el error aquí
        }
    };
    if (selectedRange !== ''){
      //fetchDocumentosporrango();
    }
//}, [selectedRange]);

///////////////////////////////////////////////
  // Función para manejar el envío del formulario.
  const verbd = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario (enviar a una nueva página).

  };

  // Función para cargar el documento al renderizar el componente
  
    const fetchDocumentos = async (minPrecio,maxPrecio) => {
        try {
          if (!data || !data.data || !Array.isArray(data.data)) {
              throw new Error('Datos de documentos no válidos recibidos');
            }
            //setDocumento(data.data); // Establecer los documentos en el estado
            data.forEach((data)=> {
              const filteredDocumentos = data.filter(doc => doc.precio >= minPrecio && doc.precio <= maxPrecio);
              setDocumento(filteredDocumentos);
              console.log(filteredDocumentos);
              console.log(documento);
              console.log(data);
              console.log(data.data); 
              setShowTable(true); // Mostrar la tabla después de filtrar
            });
            ////////////FUNCA AQUI QUEDE ESTA TARDE////////////////////////
            
            //////////////////////////////////////////
            //////////////////////////////////////////
          } catch (error) {
            console.log(error);
            // Manejar el error aquí
        }
    };

/////////////buscar coordenadas//////////////////

//useEffect(() => {
//  async function buscarCoordenadas() {
//      try {
//          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${direccion}`);
//         if (!response.ok) {
//              throw new Error('Error al obtener las coordenadas');
//          }
//          const data = await response.json();
//          if (data.length > 0) {
//              const { lat, lon } = data[0];
//              console.log(`Coordenadas de ${direccion}: Latitud ${lat}, Longitud ${lon}`);
//              setCoordenadas([lat, lon]);
//          } else {
//              console.error('No se encontraron resultados para la dirección proporcionada.');
//          }
//      } catch (error) {
//          console.error('Error al obtener las coordenadas:', error);
//          // Puedes implementar un manejo de reintentos aquí si es necesario
//      }
// }
//  buscarCoordenadas();
//}, [direccion]);
////////////////////////////////
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
        <DecoracionFondo />
        <div>
            <h1 className='titulover'>Ver Lugares</h1>
            <select className="barrafiltro" value={selectedRange} onChange={handleRangeChange}>
                <option value="">Seleccionar rango de precio</option>
                <option value="0-100">0 - 100</option>
                <option value="101-200">101 - 200</option>
                <option value="201-300">201 - 300</option>
                <option value="301-400">301 - 400</option>
            </select>
            
        <button id='filtrar' onClick={fetchDocumentosporrango}>filtrar</button>
            <ul>
                {documentos.map(documento => (
                    <li key={documento._id}>
                        <h2>{documento.nombre}</h2>
                        <p>Precio: ${documento.precio}</p>
                        <p>DNI: {documento.dni}</p>
                    </li>
                ))}
            </ul>

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
              {Array.isArray(documento) && documento.length > 0 && documento.map(doc => (
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
  