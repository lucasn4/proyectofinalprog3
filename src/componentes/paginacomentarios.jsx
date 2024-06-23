import React, { useState, useEffect } from 'react';
import '../css/style.css';
import Subtitulo from './subtitulo.jsx';
import DecoracionCorta from './decoracioncorta.jsx';
import Trabajoporvoz from './trabajoporvoz.jsx';

export const paginacomentarios = () => {
    
  const [documento, setDocumento] = useState([]);
  
  useEffect(() => {
    const fetchDocumentos = async () => {
      try {
        const response = await fetch('http://localhost:3002/register');
        if (!response.ok) {
          throw new Error('Error al recuperar los documentos');
        }
        const data = await response.json();
        setDocumento(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDocumentos();
  }, []);

  return (
  <>
  <Subtitulo />
  <DecoracionCorta />
  <div>
        <h1 className='titulover'>Comentarios de Clientes</h1>
        <table id='verlugares' className='tablaarayascoments' style={{ width: "90%" }}>
          <thead>
            <tr>
              <th className='columnacoments'>Nombre</th>
              <th className='columnacoments'>Comentarios</th>
            </tr>
          </thead>
          <tbody>
            {documento.map(doc => (
              <tr key={doc._id}>
                <td className='columnacoments'>{doc.nombre}</td>
                <td className='columnacoments'>{doc.comentarios}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Trabajoporvoz />
  </>
  )
}
export default paginacomentarios