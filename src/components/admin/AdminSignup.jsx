import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useCookies } from 'react-cookie';
import '../../styles/SignupForm.css'; // Import the CSS file
import logo from '../../assets/iec-logo.png'; // Path to your logo image
import signupSVG from '../../assets/signup.svg'; // Path to your SVG image
import Loader from '../common/Loader'; // Import your Loader component
import { REGISTER_USER } from '../../apollo/mutations';
import Web3 from 'web3'; // Import Web3
import contractABI from '../abis/VotingContract.json';

function AdminSignup() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phoneNumber: '',
        address: '',
        email: '',
        id: '',
        password: '',
        confirmPassword: '',
        role: 'ADMIN',
        status: 'Active',
        walletAddress: '',
        province:'',
    });
    const [walletStatus, setWalletStatus] = useState(''); // New state for wallet connection status
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // State for the loader
    const [cookies, setCookie] = useCookies(['token']); // React Cookie hook
    const navigate = useNavigate();
    const web3 = new Web3(window.ethereum);

    const contractAddress = '0xYourSmartContractAddress'; // Replace with your smart contract address

    const [registerUser] = useMutation(REGISTER_USER, {
        onCompleted: (data) => {
            setLoading(false);
            setCookie('token', data.registerUser.token, {
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
            });
            navigate('/admin/login');
        },
        onError: (error) => {
            setLoading(false);
            setError("An error occurred during registration. Please try again.");
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            await registerUser({
                variables: {
                    input: { ...formData }
                }
            });

            //setLoading(false);
            //navigate('/admin/login');

        } catch (error) {
            setLoading(false);
            setError("An error occurred during registration. Please try again.");
        }
    };
    // Function to connect wallet
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await web3.eth.getAccounts(); // Fetch accounts here
                const walletAddress = accounts[1]; // First account in the MetaMask wallet
                setFormData({
                    ...formData,
                    walletAddress,
                });
                setWalletStatus("Connected Successfully"); // Set the wallet connection status
            } catch (error) {
                console.error("Error connecting to wallet:", error);
                setError("Failed to connect wallet. Please try again.");
            }
        } else {
            setError("Please install MetaMask to connect your wallet.");
        }
    };
    return (
        <div className="signup-container">
            <div className="left-half">
                <h1>Admin Sign Up</h1>
                <img 
                    src={signupSVG} 
                    alt="Signup Illustration" 
                    className="svg-image responsive-svg" 
                />
            </div>
            <div className="right-half">
                <img src={logo} alt="Logo" className="logo-image" />
                <form onSubmit={handleSignup} className="form">
                    {error && <p className="error-message">{error}</p>}
                    
                    <div className="form-row">
                        <div className="form-column">
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    className="form-input"
                                />
                            </label>
                        </div>
                        <div className="form-column">
                            <label>
                                Surname:
                                <input
                                    type="text"
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    className="form-input"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-column">
                            <label>
                                Phone Number:
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    className="form-input"
                                />
                            </label>
                        </div>
                        <div className="form-column">
                            <label>
                                Address:
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    className="form-input"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-column">
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    className="form-input"
                                />
                            </label>
                        </div>
                        <div className="form-column">
                            <label>
                                ID Number:
                                <input
                                    type="text"
                                    name="id"
                                    value={formData.id}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    className="form-input"
                                />
                            </label>
                        </div>
                    </div>
                    <div className='form-row'>
                    <div className="form-column">
                        <label>
                            Province:
                            <select
                                name="province"
                                value={formData.province}
                                onChange={handleChange}
                                required
                                disabled={loading} // Disable during loading
                            >
                                <option value="">Select your province</option>
                                <option value="Eastern Cape">Eastern Cape</option>
                                <option value="Free State">Free State</option>
                                <option value="Gauteng">Gauteng</option>
                                <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                                <option value="Limpopo">Limpopo</option>
                                <option value="Mpumalanga">Mpumalanga</option>
                                <option value="Northern Cape">Northern Cape</option>
                                <option value="North West">North West</option>
                                <option value="Western Cape">Western Cape</option>
                            </select>
                        </label>
                    </div>
                </div>
                    <div className="form-row">
                        <div className="form-column">
                            <label>
                                Password:
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    className="form-input"
                                />
                            </label>
                        </div>
                        <div className="form-column">
                            <label>
                                Confirm Password:
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    className="form-input"
                                />
                            </label>
                        </div>
                    </div>
                    <button type="button" onClick={connectWallet} disabled={loading}>
                        Connect Wallet
                    </button>
                    
                    <p>{walletStatus || 'Wallet Not Connected'}</p> {/* Display wallet connection status */}
                    
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? <Loader /> : 'Sign Up'}
                    </button>

                    <div className="form-links">
                        <Link to="/admin/login" className="login-link">Already have an account? Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminSignup;
