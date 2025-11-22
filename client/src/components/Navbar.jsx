import React from 'react';
import { Navbar as BsNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth.jsx'; 
import { useCart } from '../context/useCart.jsx'; 

function Navbar() {
    const { isAuthenticated, user, logout } = useAuth();
    const { cart } = useCart();
    
    const cartItemCount = cart ? cart.items.length : 0; 
    
    return (
        // Usamos BsNavbar (Navbar de Bootstrap) con colores oscuros
        <BsNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                {/* Título y enlace a la página principal */}
                <BsNavbar.Brand as={Link} to="/">
                    🛒 **CODIGO NEGRO**
                </BsNavbar.Brand>
                <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
                
                <BsNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* Enlaces de HOME */}
                        <Nav.Link as={Link} to="/">
                            HOME
                        </Nav.Link>
                    </Nav>
                  <Nav className="me-auto">
                  {/* Enlace de Catálogo actualizado */}
                   <Nav.Link as={Link} to="/catalogue">
                       Catálogo
                    </Nav.Link>
                       </Nav>
                    <Nav>
                        {/* Carrito con contador */}
                        <Nav.Link as={Link} to="/cart" className="me-3">
                            🛍️ Carrito ({cartItemCount})
                        </Nav.Link>

                        {/* Estado de Autenticación */}
                        {isAuthenticated ? (
                            <>
                                <Nav.Text className="text-info me-3">
                                    Hola, **{user.username}**
                                </Nav.Text>
                                <Button variant="outline-danger" onClick={logout}>
                                    Cerrar Sesión
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button 
                                    as={Link} 
                                    to="/login" 
                                    variant="outline-success" 
                                    className="me-2"
                                >
                                    Iniciar Sesión
                                </Button>
                                <Button as={Link} to="/register" variant="light">
                                    Registrarse
                                </Button>
                            </>
                        )}
                    </Nav>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    );
}

export default Navbar;