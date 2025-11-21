import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth'; 
const CartContext = createContext();
const API_URL = 'http://localhost:3000/api'; 

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth(); 

    const fetchCart = async () => {
        if (!isAuthenticated) {
            setCart({ items: [], total: 0 }); 
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${API_URL}/cart`); 
            setCart(response.data);
            setError(null);
        } catch (err) {
            console.error("Error al obtener el carrito:", err);
            setError("Error al cargar el carrito. Intente nuevamente.");
            setCart({ items: [], total: 0 });
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity) => {
        if (!isAuthenticated) {
            alert('Debes iniciar sesión para agregar productos al carrito.');
            return false;
        }
        
        try {
            const response = await axios.post(`${API_URL}/cart`, { productId, quantity });
            setCart(response.data);
            alert('Producto agregado/actualizado en el carrito!');
            return true;
        } catch (err) {
            console.error("Error al agregar al carrito:", err);
            alert(err.response?.data?.message || 'Error al agregar el producto. Revise el stock.');
            return false;
        }
    };

    const removeFromCart = async (productId) => {
        if (!isAuthenticated) return false;

        try {
            const response = await axios.delete(`${API_URL}/cart/${productId}`);
            setCart(response.data);
            alert('Producto eliminado del carrito.');
            return true;
        } catch (err) {
            console.error("Error al eliminar del carrito:", err);
            alert(err.response?.data?.message || 'Error al eliminar el producto.');
            return false;
        }
    };

    const clearCart = async () => {
        if (!isAuthenticated) return false;
        
        try {
            await axios.delete(`${API_URL}/cart/clear`);
            setCart({ items: [], total: 0 });
            alert('Carrito vaciado correctamente.');
            return true;
        } catch (err) {
            console.error("Error al vaciar el carrito:", err);
            alert(err.response?.data?.message || 'Error al vaciar el carrito.');
            return false;
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchCart();
    }, [isAuthenticated]); 

    const value = {
        cart,
        loading,
        error,
        fetchCart,
        addToCart,
        removeFromCart,
        clearCart,
        cartItemCount: cart ? cart.items.reduce((acc, item) => acc + item.quantity, 0) : 0,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};