import React, { useEffect, useState } from 'react';
import '../css/style.css';
import Paneltitulo from './paneltitulo.jsx';
import Subtitulo from './subtitulo.jsx';
import DecoracionFondo from './decoracionfondo.jsx';
import Trabajoporvoz from './trabajoporvoz.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import {Imagen1,Imagen2,Imagen3,FiestaPrivada,IconoTel,IconoEmail,Instagram,Facebook}  from '../../src/assets/js/imagenes.js';
import { Link } from 'react-router-dom';
import Tarjetas from './tarjetas.jsx';

export const App = () => {

  const [activeSection, setActiveSection] = useState(1);
  const [nombre, setNombre] = useState("");
  const [comentarios, setComentarios] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".section");
      
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
          setActiveSection(index + 1);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const enviarcoments = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario (enviar a una nueva página).

    try {
    // Realiza una solicitud POST al servidor.
    let response = await fetch('http://localhost:3002/register', { 
      method: "post",
      body: JSON.stringify({ nombre, comentarios }), // Convierte los datos a formato JSON y los envía al servidor.
      headers: {
        'Content-Type': 'application/json' // Especifica el tipo de contenido de la solicitud como JSON.
      }
    });

    if (!response.ok) {
      throw new Error('Error al guardar los datos');
    }

    const data = await response.json();
    setNombre("");
    setComentarios("");
  } 
  catch (error) {
    alert("Error al guardar los datos");
    console.error(error);
    }}
  return (
    <>
      <style>
        {`
          body {
            background-color: white;
          }
        `}
      </style>
      <div className='bodytono'></div>
      <div className='subtitulo'>
        <Subtitulo />
      </div>
      <DecoracionFondo />
      <div className="App">
      <div id="div1" className={`section ${activeSection === 1 ? 'active' : ''}`}>
    <Carousel>
      <Carousel.Item> 
                <img
                    className="fototitulo"
                    src={Imagen1}
                    alt="First slide"
                    text="First slide"
                />
                <div className="text-bg">
                   <h1>Organiza tu Evento Perfecto</h1>
                   <span>
                      "Tu asistente de eventos siempre disponible: desde la planificación hasta el día del evento, estamos aquí para hacer realidad tus ideas."</span>
                </div> 
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
                <div className="text-bg">
                   <h1>"Reconocimiento de Voz"</h1>
                   <span>"Simplifica el registro de invitados con nuestra tecnología avanzada de reconocimiento de voz, haciendo que cada interacción sea eficiente."</span>
                </div>
                <img
                    className="fototitulo"
                    src={Imagen2}
                    alt="First slide"
                    text="First slide"
                />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item> 
                <div className="text-bg">
                                         <h1>"¡Encuentra el Lugar Ideal!"</h1>
                                         <span>"Encuentra el lugar perfecto para tu próximo evento con solo un clic: descubre opciones únicas y adaptables a tus necesidades."</span>
                                      </div> 
                <img
                    className="fototitulo"
                    src={Imagen3}
                    alt="First slide"
                    text="First slide"
                />
        <Carousel.Caption>
                              </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        </div>
      <div id='testimonial'  >
          <h2>Voces de Nuestros Clientes</h2>
          <p>Descubre por qué nuestros clientes eligen eventos con nosotros</p>
          < Tarjetas />
      <Link to="/coments" className='textotestimonios'> 
                <p className='textotestimonios'>Leer más Comentarios</p>  
       </Link>
      <input className='comentarios' placeholder='Ingresa tu nombre'
            value={nombre} onChange={(e) => setNombre(e.target.value)}/>
      <input className='comentarios' placeholder='Ingresa tu comentario'
            value={comentarios} onChange={(e) => setComentarios(e.target.value)}/>
      <button id='btncomentarios' onClick={enviarcoments}>Enviar</button>
      </div>
    </div>
      <footer>
         <div className="footer bottom_cross1">
            <div className="container">
               <div className="row">
                  <div className="col-md-4">
                     <ul className="location_icon">
                        
                        <li><a href="#" className='iconofooter'><img src={IconoTel} alt="#"/></a>Phone :  +(1234) 567 890</li>
                        <li><a href="#" className='iconofooter'><img src={IconoEmail} alt="#"/></a>Email : evenix1@outlook.com</li>
                        <li><a href="#" className='iconofooter'><img src={Instagram} alt="#"/></a>Instagram : Evenix</li>
                        <li><a href="#" className='iconofooter'><img src={Facebook} alt="#"/></a>Facebook : Evenix Proy</li>
                     </ul>
                  </div>
                  <div className="col-md-8">
                     <div className="map">
                        <figure><img id='fotofinal' src={FiestaPrivada} alt="#"/></figure>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
      <div>
        <Trabajoporvoz />
      </div>
    </>
  );
}

export default App;
