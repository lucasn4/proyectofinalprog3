import React, { useState, useEffect } from 'react';
import '../css/style.css';
import DecoracionFondo from './decoracionfondo.jsx';
import Subtitulo from './subtitulo.jsx';
import Trabajoporvoz from './trabajoporvoz.jsx';
import Mensajewp from './mensajewp.jsx';

const GestionInvitados = () => {
  const [documento, setDocumento] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  useEffect(() => {
    const fetchDocumentos = async () => {
      try {
        const response = await fetch('http://localhost:3001/register');
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

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    const docId = id.split('-')[1]; // Obtener el _id del documento desde el id del checkbox

    if (checked) {
      setSelectedIds([...selectedIds, docId]);
    } else {
      setSelectedIds(selectedIds.filter(itemId => itemId !== docId));
    }

  };

  useEffect(() => {
    // Filtrar los documentos seleccionados cuando cambia selectedIds
    const selectedDocs = documento.filter(doc => selectedIds.includes(doc._id));
    setSelectedDocuments(selectedDocs);
  }, [selectedIds, documento]); // Dependencias: selectedIds y documento

  useEffect(() => {
    console.log('Documentos seleccionados:', selectedDocuments);
  }, [selectedDocuments]);

  if (documento.length === 0) {
    return <p>Cargando...</p>;
  }

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
      </div>
      <DecoracionFondo />
      <div>
        <h1 className='titulover'>Invitados</h1>
        <table id='verlugares' className='tablaarayas' style={{ width: "90%" }}>
          <thead>
            <tr>
              <th className='columna'>Nombre</th>
              <th className='columna'>Apellido</th>
              <th className='columna'>Email</th>
              <th className='columna'>Telefono</th>
              <th className='columna'>Seleccionar</th>
            </tr>
          </thead>
          <tbody>
            {documento.map(doc => (
              <tr key={doc._id}>
                <td className='columna'>{doc.nombre}</td>
                <td className='columna'>{doc.apellido}</td>
                <td className='columna'>{doc.email}</td>
                <td className='columna'>{doc.telefono}</td>
                <td>
                  <input
                    className='columna'
                    id={`checkbox-${doc._id}`}
                    type='checkbox'
                    name={`seleccionar-${doc._id}`}
                    onChange={handleCheckboxChange}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Trabajoporvoz />
      </div>
      <br />
      <Mensajewp documentos={selectedDocuments} selectedIds={selectedIds} />
    </>
  );
};

export default GestionInvitados;