import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; // <-- Importación de Bootstrap
import './index.css'
import { AuthProvider } from './context/AuthProvider.jsx'; 
import { CartProvider } from './context/CartProvider.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 1. AUTHPROVIDER: NECESARIO PARA LA AUTENTICACIÓN */}
    <AuthProvider>
      {/* 2. CARTPROVIDER: NECESARIO PARA EL CARRITO, DEBE ESTAR DENTRO DE AUTHPROVIDER */}
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
)