import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/useAuth';
import '../styles/ProductDetail.css';
=======
<<<<<<< HEAD
import { useParams } from 'react-router-dom';
import axios from 'axios';
// Importaciones de Bootstrap
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap'; 
import { useCart } from '../context/useCart.jsx';
import { useAuth } from '../context/useAuth.jsx';
=======
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartProvider';
>>>>>>> 65c0989fbe76a5a33a0a13bc71bf706dcb128665
>>>>>>> d072c96e9424f77456a7fad24c55a8f7dd9ff67b

const API_URL = 'http://localhost:3000/api';

function ProductDetailPage() {
<<<<<<< HEAD
    const { id } = useParams();
=======
<<<<<<< HEAD
    const { id } = useParams(); // Obtiene el ID del producto de la URL
>>>>>>> d072c96e9424f77456a7fad24c55a8f7dd9ff67b
    const { isAuthenticated } = useAuth();
    const { handleIncreaseQuantity } = useCart();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        async function loadProduct() {
            try {
                const response = await axios.get(`${API_URL}/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error al cargar producto:", err);
                setError("No se pudo cargar la información del producto.");
                setLoading(false);
            }
        }
        loadProduct();
    }, [id]);

    const handleAddToCartClick = () => {
        if (!isAuthenticated) {
            alert("Debes iniciar sesión para añadir productos al carrito.");
            return;
        }
        handleIncreaseQuantity(product._id, quantity);
        alert(`¡${quantity}x ${product.name} añadido al carrito!`);
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0 && value <= product.stock) {
            setQuantity(value);
        } else if (value > product.stock) {
            setQuantity(product.stock);
            alert(`Stock máximo disponible: ${product.stock}`);
        }
    };

    if (loading) {
        return (
            <div className="product-detail-container">
                <div className="text-center mt-5">
                    <h2>Cargando producto...</h2>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="product-detail-container">
                <div className="error-message text-center">
                    <h2>{error || "Producto no encontrado."}</h2>
                    <Link to="/" className="btn btn-primary mt-3">
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="product-detail-page">
            <div className="container mt-5">
                {/* Breadcrumb */}
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Inicio</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/products">Productos</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {product.name}
                        </li>
                    </ol>
                </nav>

                <div className="product-detail-card shadow-sm">
                    <div className="row g-4">
                        {/* Columna Imagen */}
                        <div className="col-md-6">
                            <div className="product-image-container">
                                <img 
                                    src={product.image || '/images/placeholder.jpg'} 
                                    alt={product.name}
                                    className="product-image"
                                />
                            </div>
                        </div>
                        
                        {/* Columna Información */}
                        <div className="col-md-6">
                            <div className="product-info">
                                <h1 className="product-title">{product.name}</h1>
                                
                                <div className="price-section mb-3">
                                    <span className="product-price">${product.price}</span>
                                    {product.originalPrice && (
                                        <span className="original-price ms-2">${product.originalPrice}</span>
                                    )}
                                </div>
                                
                                <p className="product-description lead">
                                    {product.description}
                                </p>
                                
                                <div className="stock-info mb-4">
                                    <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                        {product.stock > 0 ? `✓ En Stock (${product.stock})` : '✗ Agotado'}
                                    </span>
                                </div>

                                {/* Selector de Cantidad */}
                                <div className="quantity-selector mb-4">
                                    <label htmlFor="quantity" className="form-label fw-bold">
                                        Cantidad:
                                    </label>
                                    <div className="d-flex align-items-center">
                                        <input
                                            type="number"
                                            id="quantity"
                                            min="1"
                                            max={product.stock}
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            className="quantity-input"
                                            disabled={product.stock === 0}
                                        />
                                        <span className="stock-max ms-2 text-muted">
                                            Máx: {product.stock}
                                        </span>
                                    </div>
                                </div>

                                {/* Botones de Acción */}
                                <div className="action-buttons">
                                    <button
                                        className="btn btn-primary btn-lg me-3"
                                        onClick={handleAddToCartClick}
                                        disabled={product.stock === 0}
                                    >
                                         Añadir al Carrito
                                    </button>
                                    
                                    <Link to="/" className="btn btn-outline-secondary">
                                        ← Seguir Comprando
                                    </Link>
                                </div>

                                {/* Información Adicional */}
                                <div className="product-meta mt-4">
                                    <p className="text-muted small">
                                        <strong>ID:</strong> {product._id}
                                    </p>
                                    {product.category && (
                                        <p className="text-muted small">
                                            <strong>Categoría:</strong> {product.category}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección de Productos Relacionados (opcional) */}
                <div className="related-products mt-5">
                    <h3 className="text-center mb-4">Productos Relacionados</h3>
                    <div className="text-center">
                        <p className="text-muted">
                            Próximamente: productos similares que podrían interesarte
                        </p>
                    </div>
<<<<<<< HEAD
                </div>
            </div>
        </div>
=======

                    <div className="d-flex align-items-center mb-4">
                        <span className="me-3 fw-bold">Cantidad:</span>
                        <input
                            type="number"
                            min="1"
                            max={product.stock}
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="form-control me-3"
                            style={{ width: '80px' }}
                            disabled={product.stock === 0}
                        />
                        
                        <Button
                            variant="success"
                            size="lg"
                            onClick={handleAddToCartClick}
                            disabled={product.stock === 0}
                        >
                            <i className="bi bi-cart-plus-fill me-2"></i> 
                            Añadir al Carrito
                        </Button>
                    </div>
                    
                    <p className="small text-secondary mt-4">
                        ID del Producto: {product._id}
                    </p>
                </Col>
            </Row>
        </Container>
=======
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await axios.get(`${API_URL}/products/${id}`); 
                setProduct(response.data);
                setError(null);
            } catch (err) {
                console.error("Error al obtener producto:", err);
                if (err.response && err.response.status === 404) {
                    setError('Producto no encontrado.');
                } else {
                    setError('Error al cargar la información del producto.');
                }
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        const success = await addToCart(product._id, quantity);
        if (success) {
            setQuantity(1); 
        }
    };

    if (loading) {
        return <h2 style={{ textAlign: 'center' }}>Cargando producto...</h2>;
    }

    if (error) {
        return <h2 style={{ color: 'red', textAlign: 'center' }}>{error}</h2>;
    }
    
    if (!product) {
        return <h2 style={{ textAlign: 'center' }}>Producto no encontrado.</h2>;
    }

    return (
        <div className="product-detail-page">
            <button onClick={() => navigate('/')} className="back-btn">
                ← Volver al Catálogo
            </button>
            <div className="product-info-container">
                <h1>{product.name}</h1>
                <p className="product-price">Precio: ${product.price.toFixed(2)}</p>
                <p className="product-description">{product.description || 'Sin descripción detallada.'}</p>
                <p className="product-stock">Stock disponible: <strong>{product.stock}</strong></p>

                {product.stock > 0 ? (
                    <div className="add-to-cart-controls">
                        <label htmlFor="quantity">Cantidad:</label>
                        <input
                            type="number"
                            id="quantity"
                            min="1"
                            max={product.stock}
                            value={quantity}
                            onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, Number(e.target.value))))}
                            className="quantity-input"
                        />
                        <button onClick={handleAddToCart} className="add-to-cart-btn-lg">
                            Añadir al Carrito ({quantity} unidad{quantity > 1 ? 'es' : ''})
                        </button>
                    </div>
                ) : (
                    <p style={{ color: 'red', fontWeight: 'bold' }}>Producto agotado.</p>
                )}
            </div>
        </div>
>>>>>>> 65c0989fbe76a5a33a0a13bc71bf706dcb128665
>>>>>>> d072c96e9424f77456a7fad24c55a8f7dd9ff67b
    );
}

export default ProductDetailPage;