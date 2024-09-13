import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useCookies } from 'react-cookie';
import '../../styles/LoginForm.css';
import logo from '../../assets/iec-logo.png';
import loginSVG from '../../assets/login.svg';
import Loader from '../common/Loader'; // Import the Loader component
import { LOGIN_USER } from '../../apollo/mutations';
import { AuthContext } from '../../utils/AuthContext'; // Import AuthContext

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [cookies, setCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Use AuthContext

    const [loginUser] = useMutation(LOGIN_USER, {
        onCompleted: (data) => {
            const token = data.loginUser.token;
            setCookie('token', token, { path: '/' });
            setLoading(false);
            const userData = data.loginUser.user;
            console.log("Login successful, user data:", userData); // Logging
            login(userData); // Call the login function from AuthContext
            navigate('/admin/dashboard');
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
                <h1>Welcome, Admin</h1>
                <img src={loginSVG} alt="Login Illustration" className="svg-image" />
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
                            disabled={loading} // Disable during loading
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading} // Disable during loading
                        />
                    </label>
                    <button type="submit" disabled={loading}> {/* Disable button during loading */}
                        {loading ? <Loader /> : 'Login'} {/* Show loader when loading */}
                    </button>
                    <div className="form-links">
                        <Link to="/admin/forgot-password">Forgot Password?</Link>
                        <Link to="/admin/signup">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;