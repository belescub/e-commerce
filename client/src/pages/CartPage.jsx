import React from 'react';
import { useCart } from '../context/useCart.jsx'; 
// Importaciones de Bootstrap
import { Container, Row, Col, Button, Card, ListGroup, Table } from 'react-bootstrap'; 

function CartPage() {
    // Estas son las funciones y estado que vienen de tu CartProvider
    const { 
        cart, 
        handleRemoveItem, 
        handleIncreaseQuantity, 
        handleClearCart, 
        isLoading, 
        isAuthenticated
    } = useCart();
    
    // Función de disminución (Requiere un endpoint PUT en el backend que no tenemos, por ahora solo elimina el ítem si la cantidad es 1)
    const handleDecreaseQuantity = (productId, currentQuantity) => {
        if (currentQuantity === 1) {
            handleRemoveItem(productId); 
        } else {
            // Lógica para decrementar: necesitarías un endpoint PUT /api/cart/:productId
            alert('Funcionalidad de decrementar pendiente de endpoint en el backend.');
        }
    };
    
    if (isLoading) return <h2 className="text-center mt-5">Cargando Carrito...</h2>;

    if (!isAuthenticated) {
        return <h2 className="text-center mt-5 text-danger">Debes iniciar sesión para ver tu carrito.</h2>;
    }

    if (cart.items.length === 0) {
        return <h2 className="text-center mt-5 text-secondary">Tu carrito está vacío 😔. ¡Añade algunos productos!</h2>;
    }

    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">🛍️ Carrito de Compras</h1>
            
            <Row>
                
                {/* === Columna de Ítems del Carrito (8 de 12) === */}
                <Col md={8}>
                    <Card className="shadow-sm">
                        <Card.Header as="h5">Productos en tu Carrito</Card.Header>
                        <Table responsive hover className="mb-0">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Precio Unitario</th>
                                    <th className="text-center">Cantidad</th>
                                    <th>Subtotal</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.items.map(item => (
                                    <tr key={item.product._id}>
                                        <td>{item.product.name}</td>
                                        <td>${item.product.price.toFixed(2)}</td>
                                        <td className="text-center">
                                            <Button 
                                                variant="outline-secondary" 
                                                size="sm" 
                                                onClick={() => handleDecreaseQuantity(item.product._id, item.quantity)}
                                                className="me-1"
                                            >
                                                -
                                            </Button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <Button 
                                                variant="outline-secondary" 
                                                size="sm" 
                                                onClick={() => handleIncreaseQuantity(item.product._id, 1)}
                                            >
                                                +
                                            </Button>
                                        </td>
                                        <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                                        <td>
                                            <Button 
                                                variant="outline-danger" 
                                                size="sm" 
                                                onClick={() => handleRemoveItem(item.product._id)}
                                            >
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card>
                    <div className="d-grid gap-2 mt-3">
                        <Button 
                            variant="warning" 
                            onClick={handleClearCart}
                        >
                            Vaciar Carrito
                        </Button>
                    </div>
                </Col>
                
                {/* === Columna de Resumen (4 de 12) === */}
                <Col md={4}>
                    <Card className="shadow-sm sticky-top" style={{ top: '6rem' }}>
                        <Card.Header as="h5" className="bg-primary text-white">Resumen del Pedido</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                Subtotal: <span className="float-end">${cart.total.toFixed(2)}</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="bg-light fw-bold">
                                Total a Pagar: <span className="float-end">${cart.total.toFixed(2)}</span>
                            </ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                            <div className="d-grid">
                                <Button variant="success" size="lg" className="mb-2">
                                    Proceder al Pago
                                </Button>
                                <Button variant="outline-primary" size="sm">
                                    Seguir Comprando
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CartPage;