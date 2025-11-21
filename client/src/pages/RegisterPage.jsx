import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; 

function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Controla los cambios en los campos del formulario
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Controla el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true);

        try {
            // Llama al endpoint de registro del backend
            await axios.post(`${API_URL}/auth/register`, {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            
            // Registro exitoso, redirige al login
            alert('¡Registro exitoso! Por favor, inicia sesión.');
            navigate('/login'); 

        } catch (err) {
            // Manejo de errores de registro
            const errorMessage = err.response?.data?.message || 'Error desconocido al registrar.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Crear Cuenta</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                
                {/* Muestra errores si existen */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                <div>
                    <label htmlFor="username">Nombre de Usuario</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                
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
                
                <div>
                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <button type="submit" disabled={loading}>
                    {loading ? 'Registrando...' : 'Registrarse'}
                </button>
            </form>

            <p className="link-text">
                ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión aquí</Link>
            </p>
        </div>
    );
}

export default RegisterPage;