import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useCookies } from 'react-cookie';
import '../../styles/SignupForm.css'; // Import the CSS file
import logo from '../../assets/iec-logo.png'; // Path to your logo image
import signupSVG from '../../assets/signup.svg'; // Path to your SVG image
import Loader from '../common/Loader'; // Import your Loader component
import { REGISTER_USER } from '../../apollo/mutations';

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
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // State for the loader
    const [cookies, setCookie] = useCookies(['token']); // React Cookie hook
    const navigate = useNavigate();
    
    const [registerUser] = useMutation(REGISTER_USER, {
        onCompleted: (data) => {
            setLoading(false); // Stop the loader
            console.log("User registered successfully:", data);
            // Store the token in a secure cookie
            setCookie('token', data.registerUser.token, {
                path: '/',
                secure: process.env.NODE_ENV === 'production', // Set to true in production
                sameSite: 'Strict',
            });
            navigate('/admin/login');
        },
        onError: (error) => {
            setLoading(false); // Stop the loader
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

        setLoading(true); // Start the loader
        try {
            await registerUser({
                variables: {
                    input: {
                        name: formData.name,
                        surname: formData.surname,
                        phoneNumber: formData.phoneNumber,
                        address: formData.address,
                        email: formData.email,
                        id: formData.id,
                        password: formData.password,
                        role: formData.role,
                        status: formData.status,
                    }
                }
            });
        } catch (error) {
            setLoading(false);
            console.error("Error during signup:", error);
        }        
    };

    return (
        <div className="signup-container">
            <div className="left-half">
                <h1>Admin Sign Up</h1>
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
                                    disabled={loading} // Disable during loading
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
                                    disabled={loading} // Disable during loading
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
                                    type="email"
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
    
                    <button type="submit" disabled={loading}> {/* Disable button during loading */}
                        {loading ? <Loader /> : 'Sign Up'} {/* Show loader when loading */}
                    </button>
                    <div className="form-links">
                        <Link to="/admin/login">Already have an account? Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminSignup;
