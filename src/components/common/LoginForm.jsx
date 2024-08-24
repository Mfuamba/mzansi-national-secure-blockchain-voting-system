import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useCookies } from 'react-cookie';
import '../../styles/LoginForm.css';
import logo from '../../assets/iec-logo.png';
import loginSVG from '../../assets/login.svg';
import Loader from '../common/Loader'; // Import the Loader component
import { LOGIN_USER } from '../../apollo/mutations';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [cookies, setCookie] = useCookies(['token']);
    const navigate = useNavigate();

    const [loginUser] = useMutation(LOGIN_USER, {
        onCompleted: (data) => {
            const token = data.loginUser.token;
            setCookie('token', token, { path: '/' });
            setLoading(false);
            navigate('/voter/dashboard');
        },
        onError: (error) => {
            console.error("Login error:", error);
            setError('Invalid credentials. Please try again.');
            setLoading(false);
        }
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await loginUser({ variables: { email, password } });
        } catch (error) {
            setLoading(false);
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
                        <Link to="/user/forgot-password">Forgot Password?</Link>
                        <Link to="/user/signup">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
