import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

const Mensaje = ({ documentos, selectedIds }) => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ffah1t2', 'template_t1enjtm', form.current, 'GOVqeLyQM6SVlU7EZ')
      .then(
        () => {
          console.log('SUCCESS!');
          e.target.reset(); // Opcional: Limpiar el formulario después de enviar
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
      const formData = new FormData(form.current);
      const templateParams = Object.fromEntries(formData);
  
      console.log('Información enviada a emailjs:', templateParams);
  };

  // Filtrar los documentos seleccionados por sus IDs
  const documentosSeleccionados = documentos.filter(doc => selectedIds.includes(doc._id));

  return (
    <>
      <div id='contenedor'>
        <form ref={form} onSubmit={sendEmail}>
          <br/>
          <label className='textoemail'>Nombre emisor : </label>
          <input className='cajaemail' type="text" name="from_name" required/>
          <br/>
          <label className='textoemail'>Email emisor : </label>
          <input className='cajaemail' type="email" name="from_email"  required/>
          <br/>

          /* Mostrar nombres de los documentos seleccionados */
          {documentosSeleccionados.map(doc => (
            <div key={doc._id}>
              <label className='textoemail'>Nombre receptor para {doc.nombre} : </label>
              <input className='cajaemail' type="text" name="user_name" value={doc.nombre} readOnly  required/>
              <br />
              <label className='textoemail'>Email receptor para {doc.nombre} : </label>
              <input className='cajaemail' type="email" name="to_email" value={doc.email} readOnly  required/>
              <br />
            </div>
          ))}

          <label className='textoemail'>Mensaje : </label>
          <textarea className='cajaemail' name="message" />
          <input className='btnemail' type="submit" value="Enviar" />
        </form>
      </div>
    </>
  );
};

export default Mensaje;