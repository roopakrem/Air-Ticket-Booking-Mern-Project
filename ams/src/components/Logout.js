// src/components/Logout.js
import React from 'react';
import './Logout.css';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setAuthStatus }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuthStatus(false);
    alert("You have been logged out.");
    navigate('/');
  };

  return (
    <div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
