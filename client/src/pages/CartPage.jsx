import React from 'react';
import { useCart } from '../context/CartProvider'; 

function CartPage() {
    const { 
        cart, 
        handleRemoveItem, 
        handleIncreaseQuantity, 
        handleClearCart, 
        isLoading, 
        isAuthenticated 
    } = useCart();
    
    const handleDecreaseQuantity = (productId, currentQuantity) => {
        if (currentQuantity === 1) {
            handleRemoveItem(productId); 
        } else {
            alert('Para disminuir la cantidad, debes implementar un endpoint PUT en el backend.');
        }
    };
    
    if (isLoading) return <h2 style={{ textAlign: 'center' }}>Cargando Carrito...</h2>;

    if (!isAuthenticated) {
        return <h2 style={{ textAlign: 'center' }}>Debes iniciar sesión para ver tu carrito.</h2>;
    }

    if (cart.items.length === 0) {
        return <h2 style={{ textAlign: 'center' }}>Tu carrito está vacío 😔. ¡Añade algunos productos!</h2>;
    }

    return (
        <div className="cart-page">
            <h1>🛍️ Carrito de Compras</h1>
            
            <div className="cart-content">
                
                {/* === Sección de Ítems del Carrito === */}
                <div className="cart-items">
                    {cart.items.map(item => (
                        <div key={item.product._id} className="cart-item">
                            <div className="item-details">
                                <h4>{item.product.name}</h4>
                                <p>Precio: ${item.product.price.toFixed(2)} c/u</p>
                            </div>
                            
                            <div className="item-controls">
                                <div className="quantity-control">
                                    <button 
                                        className="qty-btn"
                                        onClick={() => handleDecreaseQuantity(item.product._id, item.quantity)}
                                        aria-label="Disminuir cantidad"
                                    >
                                        -
                                    </button>
                                    <span className="quantity-display">{item.quantity}</span>
                                    <button 
                                        className="qty-btn"
                                        onClick={() => handleIncreaseQuantity(item.product._id, 1)}
                                        aria-label="Aumentar cantidad"
                                    >
                                        +
                                    </button>
                                </div>
                                
                                <button 
                                    className="remove-btn"
                                    onClick={() => handleRemoveItem(item.product._id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* === Sección de Resumen del Carrito === */}
                <div className="cart-summary">
                    <h2>Resumen del Pedido</h2>
                    <p>Subtotal: ${cart.total.toFixed(2)}</p>
                    <div className="cart-total">
                        Total a Pagar: ${cart.total.toFixed(2)}
                    </div>
                    
                    <button className="checkout-btn">
                        Proceder al Pago
                    </button>
                    
                    <button 
                        className="clear-cart-btn"
                        onClick={handleClearCart}
                    >
                        Vaciar Carrito
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartPage;