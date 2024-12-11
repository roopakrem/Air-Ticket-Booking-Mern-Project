import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddFlight.css';

const AddFlight = () => {
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
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value // Handle file input for 'image'
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formPayload = new FormData();
            for (const key in formData) {
                formPayload.append(key, formData[key]);
            }

            const savedUserRole = localStorage.getItem('AirlineName');
            formPayload.append('airline', savedUserRole);
            for (const [key, value] of formPayload.entries()) {
                console.log(`${key}: ${value}`);
            }
            const response = await fetch('http://localhost:5000/api/flights/', {
                method: 'POST',
                body: formPayload // Do not set 'Content-Type' header for FormData
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            alert('Flight added successfully!');
            navigate('/flights'); // Navigate to flights page after successful addition
        } catch (err) {
            alert(err.message || 'Failed to add flight');
        }
    };

    return (
        <div className="add-flight">
            <h2>Add Flight</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="flightNumber" placeholder="Flight Number" onChange={handleChange} required />
                <input type="text" name="origin" placeholder="Origin" onChange={handleChange} required />
                <input type="text" name="destination" placeholder="Destination" onChange={handleChange} required />
                <input type="datetime-local" name="departureTime" onChange={handleChange} required />
                <input type="datetime-local" name="arrivalTime" onChange={handleChange} required />
                <input type="text" name="duration" placeholder="Duration" onChange={handleChange} required />
                <input type="text" name="seatClassName" placeholder="Seat Model ID" onChange={handleChange} required />
                <input type="text" name="luggageCapacity" placeholder="Luggage Capacity" onChange={handleChange} required />
                <input type="file" name="image" onChange={handleChange} required />
                <button type="submit">Add Flight</button>
            </form>
        </div>
    );
};

export default AddFlight;
