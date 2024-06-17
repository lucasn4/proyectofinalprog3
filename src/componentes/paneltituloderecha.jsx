import React from 'react';
import '../css/style.css';
import { Link } from 'react-router-dom';

export const paneltituloderecha = () => {
  return (
    <Link to="/otra-pagina">
      <p className='btnreg'>Registrarse</p>
    </Link> 
  )
}
export default paneltituloderecha;
