import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth'; // Asumiendo esta ruta
import { useCart } from "../context/useCart.jsx"; // Para mostrar ítems en el carrito

function Navbar() {
    const { isAuthenticated, user, logout } = useAuth(); // Autenticación
    const { cart } = useCart(); // Carrito
    
    // Número total de ítems distintos en el carrito (para el icono)
    const cartItemCount = cart ? cart.items.length : 0; 
    
    return (
        <nav>
            <Link to="/">
                <h1>🛒 CODIGO NEGRO</h1>
            </Link>

            <div>
                <Link to="/" style={{ marginRight: '15px' }}>Catálogo</Link>
                
                <Link to="/cart" style={{ marginRight: '15px' }}>
                    Carrito ({cartItemCount})
                </Link>

                {isAuthenticated ? (
                    <>
                        <span style={{ marginRight: '15px' }}>Hola, **{user.username}**</span>
                        <button onClick={logout} className="auth-btn">
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ marginRight: '15px' }}>Iniciar Sesión</Link>
                        <Link to="/register">Registrarse</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;