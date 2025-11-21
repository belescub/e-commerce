import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // importamos la página principal
import Navbar from './components/Navbar'; 
import RegisterPage from './pages/RegisterPage'; // se importa la página de registro
import LoginPage from './pages/LoginPage';

function App() {
  return (
    // BrowserRouter permite la navegación
    <BrowserRouter>
      <Navbar /> 

      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} /> 
    
        {/* Rutas que faltan añadir */}        
        <Route path="/cart" element={<h1>Carrito de Compras</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
