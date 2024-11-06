import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useCookies } from 'react-cookie';
import '../../styles/SignupForm.css'; 
import logo from '../../assets/iec-logo.png'; 
import signupSVG from '../../assets/signup.svg'; 
import Loader from '../common/Loader'; 
import { REGISTER_USER } from '../../apollo/mutations';
import Web3 from 'web3';

function SignupForm() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phoneNumber: '',
        address: '',
        id: '',
        password: '',
        confirmPassword: '',
        role: 'VOTER',
        status: 'Active',
        walletAddress: '', 
        province: '',
    });

    const [walletStatus, setWalletStatus] = useState(''); // New state for wallet connection status
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [cookies, setCookie] = useCookies(['token']); 
    const navigate = useNavigate();
    
    const [registerUser] = useMutation(REGISTER_USER, {
        onCompleted: (data) => {
            setLoading(false);
            console.log("User registered successfully:", data);
            setCookie('token', data.registerUser.token, {
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
            });
            navigate('/user/login');
        },
        onError: (error) => {
            setLoading(false);
            console.error("Registration error:", error);
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
                    input: {
                        name: formData.name,
                        surname: formData.surname,
                        phoneNumber: formData.phoneNumber,
                        address: formData.address,
                        email: formData.email, // Optional if using wallet
                        id: formData.id,
                        password: formData.password, // Optional if using wallet
                        confirmPassword: formData.confirmPassword, // Optional if using wallet
                        role: formData.role,
                        status: formData.status,
                        walletAddress: formData.walletAddress, 
                        province: formData.province // Include province in mutation
                    }
                }
            });
        } catch (error) {
            setLoading(false);
            console.error("Error during signup:", error);
        }        
    };

    // Function to connect wallet
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await web3.eth.getAccounts(); // Fetch accounts here
                const walletAddress = accounts[0]; // First account in the MetaMask wallet
                setFormData({
                    ...formData,
                    walletAddress,
                });
                setWalletStatus("Connected Successfully");
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
                <h1>Sign Up</h1>
                <img 
                    src={signupSVG} 
                    alt="Signup Illustration" 
                    className="svg-image" 
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
                                    disabled={loading} // Disable during loading
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
                                    disabled={loading} // Disable during loading
                                />
                            </label>
                        </div>
                    </div>
    
                    <div className="form-row">
                        <div className="form-column">
                            <label>
                                Email:
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={loading} // Disable during loading
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
                                    disabled={loading} // Disable during loading
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
                                    disabled={loading} // Disable during loading
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
                                    disabled={loading} // Disable during loading
                                />
                            </label>
                        </div>
                    </div>
                    <button type="button" onClick={connectWallet} disabled={loading}>
                        Connect Wallet
                    </button>
                    
                    <p>{walletStatus || 'Wallet Not Connected'}</p> {/* Display wallet connection status */}
                    
                    <button type="submit" disabled={loading}> 
                        {loading ? <Loader /> : 'Sign Up'} 
                    </button>
                    <div className="form-links">
                        <Link to="/user/login">Already have an account? Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupForm;
