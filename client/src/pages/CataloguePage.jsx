import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Importaciones de Bootstrap
import { Container, Row, Col, Card, Button, Spinner, Form, InputGroup, Alert } from 'react-bootstrap'; 

const API_URL = 'http://localhost:3000/api'; 

function CataloguePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para la búsqueda

    useEffect(() => {
        async function loadProducts() {
            try {
                const response = await axios.get(`${API_URL}/products`); 
                let productArray = [];
                if (Array.isArray(response.data)) {
                    productArray = response.data;
                } else if (response.data && Array.isArray(response.data.products)) {
                    productArray = response.data.products;
                }
                setProducts(productArray);
                setLoading(false);
            } catch (err) {
                console.error("Error al cargar productos:", err);
                setError("Error al obtener los datos de productos. Por favor, intenta más tarde.");
                setLoading(false);
            }
        }
        loadProducts();
    }, []);

    // 1. Lógica de Búsqueda y Filtrado (se ejecuta solo cuando 'products' o 'searchTerm' cambian)
    const filteredProducts = useMemo(() => {
        if (!searchTerm) return products;
        
        const lowerCaseSearch = searchTerm.toLowerCase();
        
        return products.filter(product =>
            product.name.toLowerCase().includes(lowerCaseSearch) ||
            product.description.toLowerCase().includes(lowerCaseSearch)
        );
    }, [products, searchTerm]);


    // === Estados de Carga y Error ===
    if (loading) {
        return <h2 className="text-center mt-5"><Spinner animation="border" /> Cargando Catálogo...</h2>;
    }

    if (error) {
        return <h2 className="text-center mt-5 text-danger">{error}</h2>;
    }
    
    // Si no hay productos en la BD después de cargar
    if (products.length === 0) {
        return <h2 className="text-center mt-5 text-secondary">No hay productos disponibles en la tienda.</h2>;
    }


    // === Renderizado del Componente ===
    return (
        <Container className="my-5"> 
            <h1 className="text-center mb-4">🛍️ Catálogo Completo</h1>
            
            {/* Campo de Búsqueda */}
            <Row className="mb-4 justify-content-center">
                <Col md={6}>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Buscar por nombre o descripción..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="outline-primary">Buscar</Button>
                    </InputGroup>
                </Col>
            </Row>

            {/* Resultado de la Búsqueda */}
            {filteredProducts.length === 0 && searchTerm && (
                <Alert variant="info" className="text-center">
                    No se encontraron productos para "{searchTerm}".
                </Alert>
            )}
            
            {/* Grid de Productos Filtrados */}
            <Row xs={1} md={2} lg={4} className="g-4"> 
                {filteredProducts.map(product => (
                    <Col key={product._id}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text className="text-muted small">
                                    {product.description.substring(0, 70)}...
                                </Card.Text>
                                
                                <h4 className="mt-auto mb-2 text-primary">
                                    ${product.price.toFixed(2)}
                                </h4>
                                <p className="small text-danger">Stock: {product.stock}</p>
                                
                                <div className="d-grid gap-2">
                                    <Button 
                                        as={Link} 
                                        to={`/products/${product._id}`} 
                                        variant="outline-secondary"
                                    >
                                        Ver Detalles
                                    </Button>
                                    <Button 
                                        variant="success"
                                        // onClick={() => addToCart(product._id, 1)} 
                                        disabled={product.stock === 0}
                                    >
                                        {product.stock === 0 ? 'Sin Stock' : 'Añadir al Carrito'}
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default CataloguePage;