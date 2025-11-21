import React from 'react';
import { useCart } from '../context/CartProvider';
import { Link } from 'react-router-dom';

function CartPage() {
    // **NOTA:** Asumo que has añadido 'decreaseQuantity' a tu hook useCart
    const { cart, loading, error, removeFromCart, addToCart, clearCart, decreaseQuantity } = useCart();

    if (loading) {
        return <h2 style={{ textAlign: 'center' }}>Cargando carrito...</h2>;
    }

    if (error) {
        return <h2 style={{ color: 'red', textAlign: 'center' }}>{error}</h2>;
    }

    const items = cart?.items || [];
    const total = cart?.total || 0;

    const handleRemoveItem = (productId) => {
        removeFromCart(productId);
    };

    const handleIncreaseQuantity = (productId) => {
        addToCart(productId, 1);
    };
    
    // **MODIFICACIÓN 1: Implementación de la disminución de cantidad**
    const handleDecreaseQuantity = (productId) => {
        // Llama al nuevo método 'decreaseQuantity' que debes implementar en tu CartProvider
        decreaseQuantity(productId, 1);
    };

    return (
        <div className="cart-page">
            <h1>Carrito de Compras</h1>
            {items.length === 0 ? (
                <div style={{ textAlign: 'center' }}>
                    <p>Tu carrito está vacío. ¡Explora nuestros productos!</p>
                    <Link to="/" className="view-details-btn">
                        Ir al Catálogo
                    </Link>
                </div>
            ) : (
                <div className="cart-content">
                    <div className="cart-items">
                        {items.map((item) => (
                            <div key={item.product._id} className="cart-item">
                                {/* **MODIFICACIÓN 2: Inclusión de la imagen del producto** */}
                                <div className="item-image">
                                    <Link to={`/products/${item.product._id}`}>
                                        {/* Asumiendo que la URL de la imagen está en item.product.image */}
                                        <img 
                                            src={item.product.image} 
                                            alt={item.product.name} 
                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                                        />
                                    </Link>
                                </div>
                                
                                <div className="item-details">
                                    <Link to={`/products/${item.product._id}`}>
                                        <h4>{item.product.name}</h4>
                                    </Link>
                                    <p>Precio Unitario: ${item.product.price.toFixed(2)}</p>
                                    <p>Subtotal: ${(item.product.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <div className="item-controls">
                                    <div className="quantity-control">
                                        <button 
                                            // Llama al nuevo handler modificado
                                            onClick={() => handleDecreaseQuantity(item.product._id)}
                                            disabled={item.quantity <= 1} // Deshabilita si la cantidad es 1 o menos
                                            className="qty-btn"
                                        >
                                            -
                                        </button>
                                        <span className="quantity-display">{item.quantity}</span>
                                        <button 
                                            onClick={() => handleIncreaseQuantity(item.product._id)}
                                            disabled={item.quantity >= item.product.stock}
                                            className="qty-btn"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => handleRemoveItem(item.product._id)} 
                                        className="remove-btn"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Resumen del Carrito</h2>
                        <p className="cart-total">Total: <strong>${total.toFixed(2)}</strong></p>
                        <button 
                            onClick={clearCart} 
                            className="clear-cart-btn"
                            disabled={items.length === 0}
                        >
                            Vaciar Carrito
                        </button>
                        <button className="checkout-btn">
                            Proceder al Pago (Falta implementar)
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;