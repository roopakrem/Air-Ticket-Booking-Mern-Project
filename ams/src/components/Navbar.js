// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logout from './Logout';

const Navbar = ({ isAuthenticated, userRole, handleLogout }) => {
  return (
    <nav className="navbar">
      <h2>Airline Booking</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/flights">Flights</Link></li>

        {/* Conditionally render 'Bookings' link only if the user is authenticated */}
        {isAuthenticated && userRole === 'user' && <li><Link to="/bookings">Book a Ticket</Link></li>}

        {isAuthenticated ? (
          <>
            {userRole === 'serviceProvider' && (
              <li><Link to="/add-flight">Add Flight</Link></li>
            )}
            <li><Link to="/profile">Profile</Link></li>
            <li><Logout setAuthStatus={handleLogout} /></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/ServiceProviderLogin">ServiceProvider</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
