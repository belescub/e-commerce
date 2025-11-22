import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
<<<<<<< HEAD
=======
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css'; // <-- Importación de Bootstrap
>>>>>>> d072c96e9424f77456a7fad24c55a8f7dd9ff67b
import './index.css'
import { AuthProvider } from './context/AuthProvider.jsx'; 
import { CartProvider } from './context/CartProvider.jsx'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 1. AUTHPROVIDER: NECESARIO PARA LA AUTENTICACIÓN */}
    <AuthProvider>
      {/* 2. CARTPROVIDER: NECESARIO PARA EL CARRITO, DEBE ESTAR DENTRO DE AUTHPROVIDER */}
<<<<<<< HEAD
=======
=======
import './index.css'
import { AuthProvider } from './context/AuthProvider.jsx'; 
import { CartProvider } from './context/CartProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* PRIMERO AUTHPROVIDER */}
    <AuthProvider>
      {/* LUEGO CARTPROVIDER (que usa el AuthProvider) */}
>>>>>>> 65c0989fbe76a5a33a0a13bc71bf706dcb128665
>>>>>>> d072c96e9424f77456a7fad24c55a8f7dd9ff67b
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
)