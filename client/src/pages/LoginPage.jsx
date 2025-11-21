import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth'; // Importa el hook personalizado

function LoginPage() {
    // llamo al hook personalizado para poder acceder a la funcion login
    const { login } = useAuth(); 
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            //Llama a la funcion login del AuthContext
            await login(formData); 
            // Si se inicia sesión correctamente, se redirige a la página principal
            navigate('/'); 

        } catch (err) {
            // El error es manejado por el login en AuthContext
            const errorMessage = err.response?.data?.message || 'Error de red.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                {/* Muestra errores si existen */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <button type="submit" disabled={loading}>
                    {loading ? 'Iniciando sesión...' : 'Ingresar'}
                </button>
            </form>

            <p className="link-text">
                ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>
        </div>
    );
}

export default LoginPage;