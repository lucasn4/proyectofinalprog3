import React, { useState,useRef } from 'react';
//import emailjs from 'emailjs-com';
import axios from 'axios';


const Mensaje = ({ documentos, selectedIds }) => {
  
  const [from_name, setFromName] = useState('');
  const [from_email, setFromEmail] = useState('');
  // Filtrar los documentos seleccionados por sus IDs
  const documentosSeleccionados = documentos.filter(doc => selectedIds.includes(doc._id));
const sendEmail = async (e) => {
  e.preventDefault();
  console.log('Documentos seleccionados:', documentosSeleccionados);
  const emailsjuntos = documentosSeleccionados.map(doc => doc.email);
  console.log("Estos son los emails:", emailsjuntos);
  const nombresjuntos = documentosSeleccionados.map(doc => doc.nombre);
  console.log("Estos son los nombres:", nombresjuntos);
///////////////////////////////////////////////////////

const emails = documentos
.filter(doc => selectedIds.includes(doc._id))
.map(doc => `'${doc.email}'`) 
.join(',');
console.log(emails);
const nombres = documentos
.filter(doc => selectedIds.includes(doc._id))
.map(doc => doc.nombre);

const subject = `Sr/Sra ${nombres} esta invitado al evento de ${from_name}!`;
const html = `<p>Necesitamos confirmación de asistencia al evento de <strong>${from_name}</strong>!</p>`;

try {
// Hacer la solicitud POST al endpoint del servidor backend
const response = await axios.post('http://localhost:3000/send-email', {
  from_email: 'onboarding@resend.dev',
  to_emails: emailsjuntos,
  subject,
  html
});

console.log('Respuesta de envío de correo:', response.data);
alert('Correo electrónico enviado correctamente');
} catch (error) {
console.error('Error al enviar el correo electrónico:', error);
alert('Error al enviar el correo electrónico');
}
};

  return (
    <>
      <div id='contenedor'>
        <label className='textoemail'>Nombre emisor : </label>
        <input className='cajaemail' type="text" name="from_name" value={from_name} onChange={(e) => setFromName(e.target.value)} required/>
        <br/>
        <label className='textoemail'>Email emisor : </label>
        <input className='cajaemail' type="email" name="from_email" value={from_email} onChange={(e) => setFromEmail(e.target.value)} required/>
        <br/>
        {documentosSeleccionados.map(doc => (
          <div key={doc._id}>
          <label className='textoemail'>Nombre receptor para {doc.nombre} : </label>
          <input className='cajaemail' type="text" name="user_name" value={doc.nombre} readOnly  required/>
          <br />
          <label className='textoemail'>Email receptor para {doc.nombre} : </label>
          <input className='cajaemail' type="email" name="user_email" value={doc.email} readOnly  required/>
          <br />
          </div>
        ))};
          <input className='btnemail' type='button' value='Enviar' onClick={sendEmail} />
      </div>
    </>
  );
};
//    <br />
//  </div>
//))}
export default Mensaje;