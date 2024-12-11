// src/components/ServiceProvider.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ServiceProvider.css';

const ServiceProvider = () => {
    const [formData, setFormData] = useState({
        flightNumber: '',
        origin: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        duration: '',
        seatModel: '',
        luggageCapacity: '',
        image: null
    });
    const [flights, setFlights] = useState([]);
    const navigate = useNavigate();

    // Fetch flights added by this service provider
    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/service-providers', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message);
                setFlights(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFlights();
    }, []);

    // Handle form data changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value
        }));
    };

    // Handle flight submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formPayload = new FormData();
        for (const key in formData) {
            formPayload.append(key, formData[key]);
        }

        try {
            const response = await fetch('http://localhost:5000/api/flights/add', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: formPayload
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            alert('Flight added successfully!');
            navigate('/provider-dashboard');
        } catch (err) {
            alert(err.message || 'Failed to add flight');
        }
    };

    return (
        <div className="service-provider-dashboard">
            <h2>Service Provider Dashboard</h2>
            <div className="dashboard-section">
                <h3>Add Flight</h3>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="text" name="flightNumber" placeholder="Flight Number" onChange={handleChange} required />
                    <input type="text" name="origin" placeholder="Origin" onChange={handleChange} required />
                    <input type="text" name="destination" placeholder="Destination" onChange={handleChange} required />
                    <input type="datetime-local" name="departureTime" onChange={handleChange} required />
                    <input type="datetime-local" name="arrivalTime" onChange={handleChange} required />
                    <input type="text" name="duration" placeholder="Duration" onChange={handleChange} required />
                    <input type="text" name="seatModel" placeholder="Seat Model ID" onChange={handleChange} required />
                    <input type="text" name="luggageCapacity" placeholder="Luggage Capacity" onChange={handleChange} required />
                    <input type="file" name="image" accept="image/*" onChange={handleChange} required />
                    <button type="submit">Add Flight</button>
                </form>
            </div>

            <div className="dashboard-section">
                <h3>Your Flights</h3>
                <div className="flights-list">
                    {flights.length ? (
                        flights.map((flight) => (
                            <div key={flight.id} className="flight-card">
                                <img src={flight.imageUrl} alt={flight.flightNumber} className="flight-image" />
                                <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
                                <p><strong>Origin:</strong> {flight.origin}</p>
                                <p><strong>Destination:</strong> {flight.destination}</p>
                                <p><strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
                                <p><strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}</p>
                            </div>
                        ))
                    ) : (
                        <p>No flights added yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServiceProvider;
