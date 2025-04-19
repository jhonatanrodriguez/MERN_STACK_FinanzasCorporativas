import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import EstadoResultados from './componentes/EstadoResultados';
import Solucion from './componentes/Solucion';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<EstadoResultados/>} />
        <Route path='/solucion' element={<Solucion/>} />
      </Routes>
      
    </div>
  );
}
export default App;
