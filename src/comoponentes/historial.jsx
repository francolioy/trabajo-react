import React, { useEffect, useState } from 'react';
import "../estilos/Historial.css";

const Historial = () => {
  const [historialConsultas, setHistorialConsultas] = useState([]);

  useEffect(() => {
    const historialGuardado = localStorage.getItem('historialConsultas');
    if (historialGuardado) {
      const historialJSON = JSON.parse(historialGuardado);
      setHistorialConsultas(historialJSON);
    }
  }, []);

  return (
    <div className="historial-container">
      <h2 className='titulo-historial'>Historial de Consultas</h2>
      <table>
        <thead>
          <tr>
            <th>Fecha y Hora</th>
            <th>Tipo de Propiedad</th>
            <th>Ubicación</th>
            <th>Metros Cuadrados</th>
            <th>Precio Estimado</th>
          </tr>
        </thead>
        <tbody>
          {historialConsultas.map((consulta, index) => (
            <tr key={index}>
              <td>{consulta.fechaHora}</td>
              <td>{consulta.tipoPropiedad}</td>
              <td>{consulta.ubicacion}</td>
              <td>{consulta.metrosCuadrados}</td>
              <td>{consulta.precioEstimado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Historial;
