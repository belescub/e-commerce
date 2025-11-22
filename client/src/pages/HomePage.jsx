import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

function HomePage() {
  return (
    <Container className="my-5">
      {/* Jumbotron/Banner de Bienvenida */}
      <div className="p-5 mb-4 bg-light rounded-3 text-center shadow-sm">
        <h1 className="display-4">👋 ¡Bienvenido a CODIGO NEGRO!</h1>
        <p className="lead">
          Tu destino online para los mejores productos. Descubre nuestra colección completa o mira nuestras ofertas destacadas.
        </p>
        <hr className="my-4" />
        <p>
          Encuentra exactamente lo que estás buscando.
        </p>
        <Button 
          as={Link} 
          to="/catalogue" 
          variant="primary" 
          size="lg"
        >
          Explorar Catálogo Completo 🚀
        </Button>
      </div>

      {/* Aquí podrías añadir un carrusel o productos destacados */}
      <h2 className="text-center mt-5 mb-4">✨ Ofertas Destacadas del Mes</h2>
      {/* ... (Aquí irían los componentes de productos destacados si los tuvieras) ... */}

    </Container>
  );
}

export default HomePage;