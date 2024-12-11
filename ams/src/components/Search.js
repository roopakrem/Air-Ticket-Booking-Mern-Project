// src/components/Search.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';

const Search = () => {
  const [departure, setDeparture] = useState('');
  const [boarding, setBoarding] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    const formPayload = JSON.stringify({
      origin: boarding,
      destination: departure,
      date
    });

    try {
      const response = await fetch('http://localhost:5000/api/flights/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: formPayload
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);
      // Pass the search results to the next page (assuming you have a route set up for '/flights')
      navigate(`/flights/${data.flights[0]._id}`); // Navigate to /flights/:flightNumber);
    } catch (err) {
      alert(err.message || 'Failed to search flights');
    }
  };

  return (
    <div className="search-container">
      <h2>Search Flights</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Boarding"
          value={boarding}
          onChange={(e) => setBoarding(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Departure"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
