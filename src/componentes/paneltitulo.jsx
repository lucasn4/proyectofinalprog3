import React from 'react';
import '../css/style.css';
import  {autotitulo}  from '../assets/js/imagenes.js';
import Paneltituloderecha from './paneltituloderecha.jsx';
import Subtitulo from './subtitulo.jsx';

export const paneltitulo = () => {
  //{ mostrarPanelTituloDerecha }
  //{mostrarPanelTituloDerecha && <PanelTituloDerecha />}
  return (
    <> 
        <p className='num'>+ 54 (381) 444 1122</p>
    <Paneltituloderecha />
    </>
  )
}

export default paneltitulo;
