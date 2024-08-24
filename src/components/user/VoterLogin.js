import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/VoterLogin.css'; // Import the CSS file
import logo from '../../assets/iec-logo.png'; // Path to your logo image
import loginSVG from '../../assets/login.svg'; // Update the path to your SVG

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        // Replace with actual login logic
        if (email === "user@example.com" && password === "password") {
            navigate('/dashboard');
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="left-half">
                <h1>Welcome Back</h1>
                <img 
                    src={loginSVG} 
                    alt="Login Illustration" 
                    className="svg-image" 
                />
            </div>
            <div className="right-half">
                <img src={logo} alt="Logo" className="logo-image" />
                <form onSubmit={handleLogin} className="form">
                    {error && <p className="error-message">{error}</p>}
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Login</button>
                    <div className="form-links">
                        <a href="/forgot-password">Forgot Password?</a>
                        <a href="/signup">Sign Up</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
