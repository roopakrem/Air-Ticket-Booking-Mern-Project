import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuthStatus }) => {
  const navigate = useNavigate();
    const [error, setError] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(username === 'admin' && password === 'admin123') {
      alert("Login successful!");
      console.log("Logged in")
      setAuthStatus(true);
      navigate('/admin-dashboard');
    }
    else{
    try {
        const response = await fetch("http://localhost:5000/api/users/login", {
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
        
        alert("Login successful!");
        console.log("Logged in")
        setAuthStatus("user");
        navigate('/customer-dashboard');

    } catch (err) {
        setError(err.message || "Login failed");
    }
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

export default Login;