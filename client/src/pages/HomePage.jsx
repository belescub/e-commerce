import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import '../styles/HomePage.css'; //falta crearste archivo 

const API_URL = 'http://localhost:3000/api'; 

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //uso de estas funciones mientras de prueba
  //falta CURRUSEL CON PRODUCTOS DE TEMPORADA
  //falta VISTA DE PRODUCTOS MAS VENDIDOS/DESTACADOS

  // Dentro del useEffect debe de estar todo el código para cargar los productos
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await axios.get(`${API_URL}/products`); 
        const data = response.data;
        // Comprobamos el array
        let productArray = [];
        if (Array.isArray(data)) {
            // Caso 1: El backend devuelve directamente el array
            productArray = data;
        } else if (data && Array.isArray(data.products)) {
            // Caso 2: El backend envuelve el array
            productArray = data.products;
        } else {
            // Caso 3: No es un array (error del backend, o base de datos vacía)
            console.warn("La API no devolvio un array. Datos recibidos:", data);
        }

        setProducts(productArray);
        setLoading(false);

      } catch (err) {
        // Muestra el error de conexión si el backend está apagado o falla
        console.error("Error al cargar productos:", err);
        setError("Error al obtener los datos de productos. Por favor, intenta más tarde.");
        setLoading(false);
      }
    }
    loadProducts();
    
  }, []); // El array vacio asegura que se ejecuta solo una vez al inicio
  
  if (loading) {
    return <h2>Cargando productos...</h2>;
  }

  if (error) {
    return <h2 style={{ color: 'red', textAlign: 'center' }}>{error}</h2>;
  }
  
  // Si no hay productos después de cargar (base de datos vacía)
  if (products.length === 0) {
      return <h2 style={{ textAlign: 'center' }}>No hay productos disponibles en la tienda.</h2>;
  }

  return (
    <div className="home-page">
      <h1>🛍️ Catálogo de Productos</h1>
      
      <div className="product-grid"> 
        {products.map(product => (
        
          <div key={product._id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description.substring(0, 70)}...</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <p>Stock: {product.stock}</p>
            
            <div className="card-actions">
              <a 
                href={`/products/${product._id}`} 
                className="view-details-btn"
              >
                Ver Detalles
              </a>
              <button 
                className="add-to-cart-btn"

                disabled={product.stock === 0}
              >
                Añadir al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
}

export default HomePage;