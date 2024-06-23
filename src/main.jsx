//import React from 'react'
//import ReactDOM from 'react-dom/client'
//import  PrimerComponente  from './componentes/PrimerComponente'
//import 'bootstrap/dist/css/bootstrap.min.css'
//
//ReactDOM.createRoot(document.getElementById('root')).render(
//  <React.StrictMode>
//    <PrimerComponente />
//  </React.StrictMode>,
//)
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrimerComponente from './componentes/PrimerComponente';
import Login from './componentes/login'; // Importa el componente de la otra página
import Lugares from './componentes/lugares';
import Verlugares from './componentes/verlugares';
import Nuevosinvitados from './componentes/nuevosinvitados';
import Verinvitados from './componentes/gestioninvitados';
import Paginacomentarios from './componentes/paginacomentarios';

import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<PrimerComponente />} />
        <Route path="/otra-pagina" element={<Login />} />
        <Route path="/lugar" element={<Lugares />} />
        <Route path="/verlugar" element={<Verlugares />} />
        <Route path="/nuevosinvi" element={<Nuevosinvitados />} />
        <Route path="/verinvi" element={<Verinvitados />} />
        <Route path="/coments" element={<Paginacomentarios />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);