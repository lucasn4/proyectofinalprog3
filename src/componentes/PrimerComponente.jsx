import React from 'react';
import '../css/style.css';
import Paneltitulo from './paneltitulo.jsx';
import Subtitulo from './subtitulo.jsx';
import Trabajoporvoz from './trabajoporvoz.jsx';

export const App = () => {
  return (
    <>
      <style>
        {`
          body {
            /*background-color: rgba(0, 0, 0, 0.5);
          }
        `}
      </style>
      <div className='bodytono'></div>
      <div className='paneltitulo'>
        <Paneltitulo />
      </div>
      <div className='subtitulo'>
        <Subtitulo />
      </div>
      <div>
        <Trabajoporvoz />
      </div>
    </>
  );
}

export default App;
