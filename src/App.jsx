import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Formulario from './comoponentes/formulario';
import Encabezado from './comoponentes/encabezado';
import Historial from './comoponentes/historial';



function App() {
 
  return (
    <BrowserRouter>
    <Encabezado />
    <Routes>
    <Route path="/" element={<Formulario />} />
    <Route path="/historial" element={<Historial />} />
    </Routes>
    </BrowserRouter>  
  )
}

export default App
