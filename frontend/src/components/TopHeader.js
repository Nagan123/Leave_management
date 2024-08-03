import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../pages/main.css'; // Ensure this path is correct based on your project structure
import { useAuth } from '../AuthContext'; // Adjust the path based on your project structure

const TopHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { authState, logout } = useAuth(); // Use auth context to get authState and logout function

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    const handleLogout = (e) => {
        e.preventDefault(); // Prevent default link behavior
        logout(); // Call the logout function from context
        // Optionally, redirect to the login page or perform other actions
        window.location.href = '/'; // Redirect to login page after logout
    };

    return (
        <div className="top-header d-flex justify-content-between align-items-center p-3">
            <div className="logo">
                School Logo
            </div>

            <div className="user-info dropdown d-flex align-items-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <img src="https://placehold.co/30x30" alt="Profile" className="rounded-circle" />
                <a href="#" className="dropdown-toggle ml-2" role="button" id="dropdownMenuLink" aria-haspopup="true" aria-expanded={isOpen}>
                    {authState?.username || 'Guest'}
                </a>
                <div className={`dropdown-menu dropdown-menu-right ${isOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item" href="#">Profile</a>
                    <a className="dropdown-item" href="#">Settings</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a>
                </div>
                <i className="fas fa-bell ml-3"></i>
            </div>
        </div>
    );
}

export default TopHeader;
