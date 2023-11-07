import { Link } from 'react-router-dom';
import '../estilos/encabezado.css';


function Encabezado() {
    return (
        <div>
            <header className="encabezado">
                <div>
                    <h1>Cotizador de Seguros</h1>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Inicio</Link>
                        </li>
                        <li>
                            <Link to="/historial">Ver Historial</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Encabezado;