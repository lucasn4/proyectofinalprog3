import React from 'react';
import {Foto1,Foto2,Foto3}  from '../../src/assets/js/imagenes.js';

export const tarjetas = () => {
  return (
    <>
    
    <div className='bloquetarjetas'>
            <div className="tarjeta">
                <h3 className='titulotarjeta'>Luis M. </h3>
                <img
                    className="fototarjeta"
                    src={Foto1}
                    alt="First slide"
                />
                <p className='textotarjeta'>"Desde la gestión de invitados hasta la decoración, Evenix hizo que nuestro evento corporativo fuera impecable." - Luis M.</p>
            </div>
            <div className="tarjeta">
                <h3 className='titulotarjeta'>Javier P.</h3>
                <img
                    className="fototarjeta"
                    src={Foto2}
                    alt="Third slide"
                />
                <p className='textotarjeta'>"¡El reconocimiento de voz de Evenix hizo que interactuar con nuestro evento fuera súper fácil y moderno!"</p>
            </div>
            <div className="tarjeta">
                <h3 className='titulotarjeta'>Claudia R.</h3>
                <img
                    className="fototarjeta"
                    src={Foto3}
                    alt="Third slide"
                />
                <p className='textotarjeta'>"Los testimonios en el sitio web de Evenix realmente reflejan nuestra experiencia. Nos sentimos escuchados y bien atendidos en todo momento."</p>
            </div>
        </div>
    </>
  )
}
export default tarjetas