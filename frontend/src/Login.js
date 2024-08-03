import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './LoginRegister.css'; // Ensure this file exists
import { useAuth } from './AuthContext'; // Import useAuth

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
  };

 const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3001/login', {
            username: loginUsername,
            password: loginPassword,
        });

        localStorage.setItem('token', response.data.token);
        console.log('Token set in localStorage:', localStorage.getItem('token'));

        // Pass the user details to the login function
        login({ username: loginUsername, token: response.data.token });

        Swal.fire('Success', 'Login successful', 'success').then(() => {
            navigate('/dashboard');
        });
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message); // Log detailed error
        Swal.fire('Error', 'Invalid username or password', 'error');
    }
};


  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:3001/register', {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      });
      Swal.fire('Success', 'User registered successfully', 'success').then(() => {
        handleTabChange('login');
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire('Error', 'Email already registered', 'error');
      } else {
        Swal.fire('Error', 'Registration failed', 'error');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <div className="login-logo">
          <img src="https://placehold.co/100x100" alt="Logo" className="img-fluid" />
        </div>
      </div>
      <div className="login-form">
        <div className="login-buttons">
          <button
            className={`btn ${activeTab === 'login' ? 'btn-warning' : 'btn-light'}`}
            onClick={() => handleTabChange('login')}
          >
            Login
          </button>
          <button
            className={`btn ${activeTab === 'register' ? 'btn-warning' : 'btn-light'}`}
            onClick={() => handleTabChange('register')}
          >
            Register
          </button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {activeTab === 'login' && (
          <div>
            <h2 className="font-weight-bold mb-2">Welcome</h2>
            <p className="text-muted mb-4">Please login to your account</p>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="login-username">Username or Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="login-username"
                  placeholder="Enter your username or email"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="login-password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <a href="#" className="forgot-password text-muted">Forgot Password?</a>
                <button type="submit" className="btn btn-warning">OK</button>
              </div>
            </form>
          </div>
        )}
        {activeTab === 'register' && (
          <div>
            <h2 className="font-weight-bold mb-2">Register</h2>
            <p className="text-muted mb-4">Create your account</p>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label htmlFor="register-username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="register-username"
                  placeholder="Enter your username"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="register-email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="register-email"
                  placeholder="Enter your email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="register-password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="register-password"
                  placeholder="Enter your password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="register-confirm-password">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="register-confirm-password"
                  placeholder="Confirm your password"
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-warning btn-block">Register</button>
            </form>
          </div>
        )}
        <a href="#" className="register-link text-muted">Register your School in our Apps</a>
        <p className="terms">Terms and Conditions & Privacy Policy</p>
      </div>
    </div>
  );
};

export default Login;
