// src/components/FlightDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './FlightDetails.css';
import { useNavigate } from 'react-router-dom';

const FlightDetails = () => {
  const { flightNumber } = useParams(); // Get the flightNumber from the URL parameters
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchFlight = async () => {
      try {
        // Log to confirm flightNumber is correct
        console.log("Fetching flight details for flight number:", flightNumber);

        const response = await fetch(`http://localhost:5000/api/flights/${flightNumber}`);
        if (!response.ok) {
          throw new Error('Failed to fetch flight details');
        }

        const flightData = await response.json();

        // Log to verify the structure of flightData
        console.log("Fetched flight data:", flightData.flight);

        setFlight(flightData.flight);
      } catch (err) {
        console.error("Error fetching flight details:", err);
        setError(err.message || 'Could not load flight details');
      } finally {
        setLoading(false);
      }
    };

    // Ensure we only fetch data if flightNumber is defined
    if (flightNumber) {
      fetchFlight();
    } else {
      console.error("flightNumber is undefined");
    }
  }, [flightNumber]);

  const handleSubmit = () => {
    // Add your booking logic here
    navigate(`/booking/${flight._id}`);
  };

  // Loading and Error States
  if (loading) return <div>Loading flight details...</div>;
  if (error) return <div>{error}</div>;

  // Check if flight data was successfully loaded
  return (
    <div className="flight-detail-container">
      <h2>Flight Details</h2>
      {flight ? (
        <>
          <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
          <p><strong>Origin:</strong> {flight.origin}</p>
          <p><strong>Destination:</strong> {flight.destination}</p>
          <p><strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
          <p><strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}</p>
          <p><strong>luggageCapacity:</strong> {flight.luggageCapacity}</p>
          <p><strong>Duration:</strong> {flight.duration}</p>
          <button onSubmit={handleSubmit}>Book Ticket</button>
        </>
      ) : (
        <p>Flight details are not available.</p>
      )}
    </div>
  );
};

export default FlightDetails;
