import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartProvider';

const API_URL = 'http://localhost:3000/api'; 

function ProductDetailPage() {
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
    );
}

export default ProductDetailPage;