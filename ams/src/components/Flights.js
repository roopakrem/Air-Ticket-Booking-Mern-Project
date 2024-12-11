import React, { useEffect, useState } from 'react';
import './Flights.css';

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [seatClasses, setSeatClasses] = useState([]);
  const [selectedSeatClass, setSelectedSeatClass] = useState('economy'); // Default to economy or any other preference
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch flights and seat classes on component mount
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/flights');
        const seatClassResponse = await fetch('http://localhost:5000/api/seat-classes');
        
        if (!response.ok || !seatClassResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const flightData = await response.json();
        const seatClassData = await seatClassResponse.json();

        // Sort flights by price (cheapest to costliest)
        // const sortedFlights = flightData.sort((a, b) => a.price - b.price);
        // console.log(flightData)
        setFlights(flightData);
        setSeatClasses(seatClassData);  // Assume data includes seat class options like ['economy', 'business', etc.]
      } catch (err) {
        console.log(err)
        console.error(err);
        setError('Failed to fetch flights');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  // Handle seat class selection change
  const handleSeatClassChange = (event) => {
    setSelectedSeatClass(event.target.value);
  };

  console.log(flights)
  // Filter flights based on seat class availability
  // const filteredFlights = flights.filter(flight => flight.seatAvailability[selectedSeatClass] > 0);
  const filteredFlights = flights;

  


  if (loading) return <div>Loading flights...</div>;
  if (error) return <div>{error}</div>;




  return (
    <div className="flights-container">
      <h1>Flight Details</h1>

      {/* Seat Class Selection */}
      {/* <label>
        Choose Seat Class:
        <select value={selectedSeatClass} onChange={handleSeatClassChange}>
          {seatClasses.seatClasses.map((seatClass, index) => (
            <option key={index} value={seatClass.seatClassName}>{seatClass.seatClassName}</option>
          ))}
        </select>
      </label> */}

      <ul className="flights-list">
        {filteredFlights.flights.map(flight => (
          <li key={flight.flightNumber} className="flight-item">
            <h2>{flight.flightNumber}</h2>
            <p><strong>Origin:</strong> {flight.origin}</p>
            <p><strong>Destination:</strong> {flight.destination}</p>
            <p><strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
            <p><strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}</p>
            <p><strong>Duration:</strong> {flight.duration}</p>
            <p><strong>Luggage Capacity:</strong> {flight.luggageCapacity}</p>
            <p><strong>Status:</strong> {flight.status}</p>
            <p><strong>Approved:</strong> {flight.approved ? 'Yes' : 'No'}</p>
            {/* <p><strong>Price:</strong> ${flight.price}</p> */}
            <p><strong>Seat Model:</strong> {flight.seatModel.seatClassName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;
