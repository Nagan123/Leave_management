import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginRegister.css'; // Create a separate CSS file for custom styles

const LoginRegister = () => {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
        {activeTab === 'login' && (
          <div>
            <h2 className="font-weight-bold mb-2">Welcome</h2>
            <p className="text-muted mb-4">Please login to your account</p>
            <form>
              <div className="form-group">
                <label htmlFor="login-username">Username or Email</label>
                <input type="text" className="form-control" id="login-username" placeholder="Enter your username or email" />
              </div>
              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input type="password" className="form-control" id="login-password" placeholder="Enter your password" />
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
            <h2 className="font-weight-bold mb-2 text-center">Register</h2>
            <p className="text-muted mb-4 text-center">Create your account</p>
            <form>
              <div className="form-group">
                <label htmlFor="register-username">Username</label>
                <input type="text" className="form-control" id="register-username" placeholder="Enter your username" />
              </div>
              <div className="form-group">
                <label htmlFor="register-email">Email</label>
                <input type="email" className="form-control" id="register-email" placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <label htmlFor="register-password">Password</label>
                <input type="password" className="form-control" id="register-password" placeholder="Enter your password" />
              </div>
              <div className="form-group">
                <label htmlFor="register-confirm-password">Confirm Password</label>
                <input type="password" className="form-control" id="register-confirm-password" placeholder="Confirm your password" />
              </div>
              <button type="submit" className="btn btn-warning btn-block mt-3">Register</button>
            </form>
          </div>
        )}
        <a href="#" className="register-link text-muted">Register your School in our Apps</a>
        <p className="terms">Terms and Conditions & Privacy Policy</p>
      </div>
    </div>
  );
};

export default LoginRegister;
