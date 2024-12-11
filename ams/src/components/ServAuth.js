import React, { useState } from 'react';
import './ServAuth.css';
import { useNavigate } from 'react-router-dom';

const ServiceProviderLogin = ({ setAuthStatus }) => {
    const [error, setError] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:5000/api/service-providers/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: username,
                password: password,
            }),
        });
        const responseData = await response.json();
        if (!response.ok) {
          alert("Sorry")
            throw new Error(responseData.message);
        }
        console.log(responseData.ServiceProvider.airlineName);
        localStorage.setItem("AirlineName", responseData.ServiceProvider.airlineName);
        alert("Login successful!");
        console.log("Logged in")
        navigate('/ServiceProvider');
        setAuthStatus("serviceProvider");
    } catch (err) {
        setError(err.message || "Login failed");
    }
    
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default ServiceProviderLogin;