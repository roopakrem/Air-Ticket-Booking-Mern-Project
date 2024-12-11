// src/components/AuthPage.js
import React, { useState } from 'react';
import Login from './Login';   // Importing the Login component
import Signup from './Signup'; // Importing the Signup component

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Signup

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button
          onClick={() => setIsLogin(true)}
          className={isLogin ? 'active' : ''}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={!isLogin ? 'active' : ''}
        >
          Sign Up
        </button>
      </div>
      
      {isLogin ? <Login /> : <Signup />} {/* Display either Login or Signup based on state */}
    </div>
  );
};

export default AuthPage;
