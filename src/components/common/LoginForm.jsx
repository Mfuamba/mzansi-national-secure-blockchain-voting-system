import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import '../../styles/LoginForm.css';
import logo from '../../assets/iec-logo.png';
import loginSVG from '../../assets/login.svg';
import Loader from '../common/Loader';
import { LOGIN_USER } from '../../apollo/mutations';
import { AuthContext } from '../../utils/AuthContext';

function Login() {
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [walletStatus, setWalletStatus] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [loginUser] = useMutation(LOGIN_USER, {
        onCompleted: (data) => {
            const token = data.loginUser.token;
            // Store the token in local storage
            localStorage.setItem('token', token);
            setLoading(false);
            console.log("Login Token:", token);

            const userData = data.loginUser.user;
            console.log("Login successful, user data:", userData);
            login(userData);
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
        if (!walletConnected) {
            setError("Please connect your wallet before logging in.");
            return;
        }
        
        setLoading(true);
        setError('');

        try {
            console.error("Frontend received walletADDRESS:", walletAddress);

            await loginUser({ variables: { email, password, walletAddress } });
        } catch (error) {
            setLoading(false);
        }
    };

    const connectWallet = async () => {
        console.log("Attempting to connect wallet...");
    
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts.length > 0) {
                    const userWalletAddress = accounts[0];
                    setWalletConnected(true);
                    setWalletAddress(userWalletAddress);
                    setWalletStatus("Connected Successfully");
                    setError('');
                    console.log("Wallet connected:", userWalletAddress);
                } else {
                    console.log("No accounts found.");
                    setError("No accounts found in MetaMask.");
                }
            } catch (error) {
                console.error("Error connecting to wallet:", error);
                setError("Failed to connect wallet. Please try again.");
            }
        } else {
            console.log("MetaMask not detected");
            setError("Please install MetaMask to connect your wallet.");
        }
    };

    return (
        <div className="login-container">
            <div className="left-half">
                <h1>Welcome Back</h1>
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
                            disabled={loading}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </label>
                    <button type="button" onClick={connectWallet} disabled={loading}>
                        {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
                    </button>
                    
                    <p>{walletStatus || 'Wallet Not Connected'}</p>
                    
                    <button type="submit" disabled={loading}>
                        {loading ? <Loader /> : 'Login'}
                    </button>
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
