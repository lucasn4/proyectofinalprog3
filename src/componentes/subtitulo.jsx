import React from 'react';
import '../css/style.css';
import { Link } from 'react-router-dom';


export const subtitulo = () => {    
  return (
      <> 
      <Link to="/" className='a'> 
                <p className='tituloprinc'>Evenix</p>  
       </Link> 
       <div className='menusubtitulo'>    
      <Link to="/" className='a'> 
                <p className='paginas'>Principal</p>  
       </Link>
       <ul className='nav'>
        <li><a href=''>Lugares</a>
          <ul>
            <li>
              <Link to="/lugar" className='a'>
                <p className='subpaginas'>Agregar Lugares</p>
              </Link>
              </li>
            <li>
              <Link to="/verlugar" className='a'>
                <p className='subpaginas'>Ver Lugares</p>
              </Link>
              </li>
          </ul>
        </li>
       </ul>
      <Link to="/" className='a'> 
                <p className='paginas'>Planificaciones</p>  
       </Link> 
       <ul className='nav'>
        <li><a href=''>Invitaciones</a>
          <ul>
            <li>
              <Link to="/nuevosinvi" className='a'>
                <p className='subpaginas'>Nuevos Invitados</p>
              </Link>
              </li>
            <li>
              <Link to="/verinvi" className='a'>
                <p className='subpaginas'>Gestionar Invitaciones</p>
              </Link>
              </li>
          </ul>
        </li>
       </ul>
       </div>
      </>
    )
  }
  
  export default subtitulo;