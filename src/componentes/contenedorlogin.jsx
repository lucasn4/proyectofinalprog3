import React from 'react';
import '../css/login.css';

export const contenedorlogin = () => {
  return (
    <div className='contenedorlogin'>
        <label className='titulocajatexto'>Nombre:</label>     
        <input className='cajatexto'></input>
        <label className='titulocajatexto'>Apellido:</label>
        <input className='cajatexto'></input>
        <label className='titulocajatexto'>Email:</label>
        <input className='cajatexto'></input>
        <label className='titulocajatexto'>Telefono:</label>
        <input className='cajatexto'></input>
        <label className='titulocajatexto'>Contraseña:</label>
        <input className='cajatexto' type='password'></input>
        <button className='botonguardar' type='submit'>Guardar</button>
    </div>
  )
}

export default contenedorlogin;