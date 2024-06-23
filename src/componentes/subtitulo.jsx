import React, { useState } from 'react';
import '../css/style.css';
import { Link } from 'react-router-dom';
import {Menu}  from '../../src/assets/js/imagenes.js';


export const subtitulo = () => {    
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  
  const toggleNav = () => {
    if (isPanelOpen) {
      closeNav();
    } else {
      openNav();
    }
  };
  function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
    setIsPanelOpen(true);
  }
  
  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
    setIsPanelOpen(false);
  }
  return (
      <> 
      <div id="panelfijoarriba">
      <Link to="/" className='start'> 
                <p className='tituloprinc'>Evenix</p>  
       </Link>
       
      <div id="mySidepanel" className="sidepanel">
         <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>×</a>
      <Link to="/" className='a'> 
                <p className='subpaginas'>Home</p>  
       </Link> 
              <Link to="/verlugar" className='a'>
                <p className='subpaginas'>Ver Lugares</p>
              </Link>
      <Link to="/" className='a'> 
                <p className='paginas'>Planificaciones</p>  
       </Link> 
              <Link to="/verinvi" className='a'>
                <p className='subpaginas'>Gestionar Invitaciones</p>
              </Link> 
              <Link to="/" href="#testimonial" className='a'>
                <p className='subpaginas'><a href="#testimonial">Testimonios</a></p>
              </Link>
         <a href="#contact">Contact</a>
      </div>
                     <div className="right_bottun">
                        <ul className="conat_info d_none ">
                           <li><a href="#"><i className="fa fa-user" aria-hidden="true"></i></a></li>
                           <li><a href="#"><i className="fa fa-search" aria-hidden="true"></i></a></li>
                        </ul>
                        <button className="openbtn" onClick={toggleNav}><img src={Menu} alt="#"/> </button> 
                     </div>
      </div>
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