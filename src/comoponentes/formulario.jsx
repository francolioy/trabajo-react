import React, { useState, useEffect } from 'react';
import "../estilos/formulario.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

const Formulario = () => {

  const [data, setData] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(''); // Inicialmente, no se selecciona nada
  const [selectedLocation, setSelectedLocation] = useState('');
  const [precioEstimado, setPrecioEstimado] = useState(0);
  const [guardarVisible, setGuardarVisible] = useState(false);

  const [historialConsultas, setHistorialConsultas] = useState([]);
  
  useEffect(() => {
    const historialGuardado = localStorage.getItem('historialConsultas');
    if (historialGuardado) {
      const historialJSON = JSON.parse(historialGuardado);
      setHistorialConsultas(historialJSON);
    }
  }, []);

  useEffect(() => {
    // Realizar la solicitud con Axios
    axios.get('datos.json') // Ruta del archivo JSON, lo deje en Public hasta saber como dejarlo en SRC y que funcione desde ahi
      .then((response) => {
        setData(response.data); // Almacenar los datos en el estado local
      })
      .catch((error) => {
        console.error('Error al cargar los datos:', error);
      });
  }, []);

  // Manejar cambios en el selector de tipo de propiedad
  const handlePropertyChange = (event) => {
    setSelectedProperty(event.target.value); // Actualizar el estado con el valor seleccionado
  };

  // Manejar cambios en el selector de ubicación
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const calcularPrecioEstimado = () => {
    // Obtener el valor del tipo de propiedad, ubicación y metros cuadrados
    const costoM2 = 35.86;
    const metrosCuadrados = parseInt(document.getElementById("metros2").value, 10);
    const propiedadFactor = data.find(item => item.categoria === 'propiedad' && item.tipo === selectedProperty)?.factor;
    const ubicacionFactor = data.find(item => item.categoria === 'ubicacion' && item.tipo === selectedLocation)?.factor;
    
    const mostrarAlerta = () => {
      Swal.fire(
        "Error", "Por favor ingrese los datos solicitados", "error"
        );
    }

    const mostrarAlertaExitosa = () => {
      Swal.fire({
        title: "Exito",
        text: "Cotización realizada con exito",
        timer: 2000,
        icon: "success"
      });
    }


    if (propiedadFactor && ubicacionFactor) {
      const precioEstimado = costoM2 * metrosCuadrados * propiedadFactor * ubicacionFactor;
      precioEstimado.toFixed(2);
      setGuardarVisible(true);
      setPrecioEstimado(Number(precioEstimado.toFixed(2))); // Redondea a dos decimales
      mostrarAlertaExitosa();
    } else {
      mostrarAlerta();
      setGuardarVisible(false);
    }
  };


  const handleGuardarClick = () => {
    // Obtener la fecha y hora actual
    const fechaHoraActual = moment().format('YYYY-MM-DD HH:mm:ss');
  
    // Crear un objeto que represente la consulta de la cotización con fecha y hora
    const cotizacion = {
      fechaHora: fechaHoraActual,
      tipoPropiedad: selectedProperty,
      ubicacion: selectedLocation,
      metrosCuadrados: parseInt(document.getElementById("metros2").value, 10),
      precioEstimado: precioEstimado,
    };
  
    const nuevoHistorial = [...historialConsultas, cotizacion];

    setHistorialConsultas(nuevoHistorial);

    const mostrarAlertaGuardado = () => {
      Swal.fire({
        title: "Guardado",
        text: "Cotización guardada con exito",
        timer: 2000,
        icon: "success"
      });
    }

    // Guardar el historial completo en el localStorage
    const historialJSON = JSON.stringify(nuevoHistorial);
    localStorage.setItem('historialConsultas', historialJSON);
    
    mostrarAlertaGuardado();
   
  };
  

  return (
    <div>
      {data && (
        <div className="cotizador-principal">
          <h2 className="center separador">Completa los datos solicitados</h2>

          {/* Selector de tipo de propiedad */}
          <label htmlFor="propiedad">Selecciona el tipo de propiedad</label>
          <select id="propiedad" value={selectedProperty} onChange={handlePropertyChange}>
            <option value="" disabled>Seleccione una opción...</option>
            {data
              .filter((item) => item.categoria === 'propiedad')
              .map((item, index) => (
                <option key={index} value={item.tipo}>
                  {item.tipo}
                </option>
              ))}
          </select>

          {/* Selector de ubicación */}
          <label htmlFor="ubicacion">Selecciona su ubicación</label>
          <select id="ubicacion" value={selectedLocation} onChange={handleLocationChange}>
            <option value="" disabled>Seleccione una opción...</option>
            {data
              .filter((item) => item.categoria === 'ubicacion')
              .map((item, index) => (
                <option key={index} value={item.tipo}>
                  {item.tipo}
                </option>
              ))}
          </select>

          <label htmlFor="metros2">Ingresa los Metros cuadrados:</label>
          <input type="number" id="metros2" min="20" max="500" required placeholder='Ingrese un valor'/>

          <div className="center separador">
            <button onClick={calcularPrecioEstimado}>Cotizar</button>
          </div>

          <div className="center separador">
          <p className="importe">
            Precio estimado: $ <span id="valorPoliza">{precioEstimado.toFixed(2)}</span>
            {guardarVisible && (
            <span
              className="guardar"
              title="Guardar en historial"
              onClick={handleGuardarClick}
            >
            💾
            </span>
            )}
          </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Formulario;