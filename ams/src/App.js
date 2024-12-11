// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Flights from './components/Flights';
import Search from './components/Search';
import FlightsDetails from './components/FlightsDetails';
import ServiceProvider from './components/ServiceProvider';
import ServiceProviderLogin from './components/ServAuth';
import AddFlight from './components/AddFlight';
import TicketBookings from './components/TicketBooking';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const savedAuthStatus = localStorage.getItem('isAuthenticated');
    const savedUserRole = localStorage.getItem('userRole');
    if (savedAuthStatus === 'true') {
      setIsAuthenticated(true);
      setUserRole(savedUserRole);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
  };

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} userRole={userRole}/>
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login setAuthStatus={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/ServiceProvider" element={<ServiceProvider />} />
            <Route path="/flights/:flightNumber" element={<FlightsDetails />} />
            <Route path="/ServiceProviderLogin" element={<ServiceProviderLogin setAuthStatus={handleLogin} />} />
            <Route path="/add-flight" element={<AddFlight/>} />
            <Route path="/booking/:bookingId" element={<TicketBookings/>} />
            <Route path="/" element={<Search />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
