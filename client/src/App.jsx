import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import Navbar from './components/Navbar'; // <-- IMPORTADO
import RegisterPage from './pages/RegisterPage'; 
import LoginPage from './pages/LoginPage';

function App() {
  return (
    // <BrowserRouter> es el router principal que envuelve todo.
    <BrowserRouter> 
      {/* EL NAVBAR ES VISIBLE EN TODAS LAS PÁGINAS */}
      <Navbar /> 

      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/cart" element={<h1>Carrito de Compras</h1>} /> {/* O CartPage */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
