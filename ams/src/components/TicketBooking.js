import React, { useState } from 'react';
import './TicketBooking.css';
import { useParams } from 'react-router-dom';

const TicketBookings = () => {
  // State for booking details
  const [seatClass, setSeatClass] = useState('Economy');
  const [addAnother, setAddAnother] = useState(false);
  const [passengerDetails, setPassengerDetails] = useState([
    { name: '', email: '', citizenship: '', foodChoice: 'No', foodPreference: '' }
  ]);
  const [errors, setErrors] = useState({});

  // Handle passenger details change
  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPassengerDetails = [...passengerDetails];
    updatedPassengerDetails[index][name] = value;
    setPassengerDetails(updatedPassengerDetails);
  };

  // Add new passenger form
  const handleAddPassenger = () => {
    setPassengerDetails([
      ...passengerDetails,
      { name: '', email: '', citizenship: '', foodChoice: 'No', foodPreference: '' }
    ]);
  };

  // Handle food choice change for each passenger
  const handleFoodChoiceChange = (index, e) => {
    const updatedPassengerDetails = [...passengerDetails];
    updatedPassengerDetails[index].foodChoice = e.target.value;

    // Reset food preference if changed to "No"
    if (e.target.value === 'No') {
      updatedPassengerDetails[index].foodPreference = '';
    }
    setPassengerDetails(updatedPassengerDetails);
  };

  // Validation function
  const validateForm = () => {
    const tempErrors = {};
    let isValid = true;

    // Validate each passenger's details
    passengerDetails.forEach((passenger, index) => {
      if (!passenger.name) {
        isValid = false;
        tempErrors[`name-${index}`] = 'Name is required';
      }
      if (!passenger.email) {
        isValid = false;
        tempErrors[`email-${index}`] = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(passenger.email)) {
        isValid = false;
        tempErrors[`email-${index}`] = 'Email is not valid';
      }
      if (passenger.foodChoice === 'Yes' && !passenger.foodPreference) {
        isValid = false;
        tempErrors[`foodPreference-${index}`] = 'Food preference is required if food is selected';
      }
    });

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = useParams()
    if (validateForm()) {
      // Prepare payload for the booking API
      const formPayload1 = {
        passengers: passengerDetails.map(passenger => ({
          name: passenger.name,
          food: passenger.foodChoice,
        })),
      };

      try {
        const response1 = await fetch('http://localhost:5000/api/passengers/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formPayload1)
          });
        const data1 = await response1.json();
        const formPayload2={
            flight: id,
            userId: ,
            passenger:,
            paymentMethod:"Card"
        }

        const response2 = await fetch('http://localhost:5000/api/bookings/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formPayload2)
        });

        const data = await response.json();
        if (!response1.ok && !response2.ok) throw new Error(data.message);

        alert('Booking created successfully!');
        // Navigate to another page or reset form as needed
      } catch (err) {
        alert(err.message || 'Failed to create booking');
      }
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <div className="Booking">
      <h2>Book a Flight</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="seatClass">Seat Class:</label>
          <select
            id="seatClass"
            value={seatClass}
            onChange={(e) => setSeatClass(e.target.value)}
            required
          >
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First">First Class</option>
          </select>
        </div>

        {passengerDetails.map((passenger, index) => (
          <div key={index} className="passenger-details">
            <h3>Passenger {index + 1}</h3>
            <div>
              <label htmlFor={`name-${index}`}>Name:</label>
              <input
                type="text"
                id={`name-${index}`}
                name="name"
                value={passenger.name}
                onChange={(e) => handlePassengerChange(index, e)}
                required
              />
              {errors[`name-${index}`] && <p className="error">{errors[`name-${index}`]}</p>}
            </div>
            <div>
              <label htmlFor={`email-${index}`}>Email:</label>
              <input
                type="email"
                id={`email-${index}`}
                name="email"
                value={passenger.email}
                onChange={(e) => handlePassengerChange(index, e)}
                required
              />
              {errors[`email-${index}`] && <p className="error">{errors[`email-${index}`]}</p>}
            </div>
            <div>
              <label htmlFor={`citizenship-${index}`}>Nationality:</label>
              <input
                type="text"
                id={`citizenship-${index}`}
                name="citizenship"
                value={passenger.citizenship}
                onChange={(e) => handlePassengerChange(index, e)}
                required
              />
            </div>

            <div>
              <label htmlFor={`foodChoice-${index}`}>Food Choice:</label>
              <select
                id={`foodChoice-${index}`}
                name="foodChoice"
                value={passenger.foodChoice}
                onChange={(e) => handleFoodChoiceChange(index, e)}
                required
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            {passenger.foodChoice === 'Yes' && (
              <div>
                <label htmlFor={`foodPreference-${index}`}>Food Preference:</label>
                <select
                  id={`foodPreference-${index}`}
                  name="foodPreference"
                  value={passenger.foodPreference}
                  onChange={(e) => handlePassengerChange(index, e)}
                  required
                >
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                </select>
                {errors[`foodPreference-${index}`] && <p className="error">{errors[`foodPreference-${index}`]}</p>}
              </div>
            )}
          </div>
        ))}

        <div>
          <label>
            <input
              type="checkbox"
              checked={addAnother}
              onChange={() => setAddAnother(!addAnother)}
            />
            Add another passenger
          </label>
        </div>

        {addAnother && (
          <button type="button" onClick={handleAddPassenger}>
            Add Another Passenger
          </button>
        )}

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default TicketBookings;
