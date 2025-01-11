// components/ViewBookings.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Optional: If you are using a UI library like Material-UI, you can import the necessary components.
// For simplicity, this example uses standard HTML elements.

function ViewBookings() {
  const [bookings, setBookings] = useState([]); // State to hold bookings data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null);     // State to manage error messages

  useEffect(() => {
    // Function to fetch bookings data
    const fetchBookings = async () => {
      try {
        // Retrieve user information from localStorage
        const storedUser = {
          userId: JSON.parse(localStorage.getItem("user")).id
        }

        console.log(storedUser);

        // Make POST request to fetch user-specific trips
        const response = await axios.post('http://13.250.101.135:5000/trip/getTripUser', storedUser);

        // Assuming the backend sends the bookings data in response.data.trips
        if (response.data.trips) {
          setBookings(response.data.trips);
        } else {
          setBookings([]);
        }

        setLoading(false); // Data fetched successfully
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError(err.response?.data?.message || err.message || "An unexpected error occurred.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Function to format the date string to a more readable format (optional)
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString(undefined, options);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Bookings</h2>

      {/* Loading State */}
      {loading && <p>Loading your bookings...</p>}

      {/* Error State */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Bookings Table */}
      {!loading && !error && bookings.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Bus Number</th>
              <th style={tableHeaderStyle}>Trip Date</th>
              <th style={tableHeaderStyle}>Seats Booked</th>
              <th style={tableHeaderStyle}>Booking Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} style={tableRowStyle}>
                <td style={tableCellStyle}>{booking.busno}</td>
                <td style={tableCellStyle}>{formatDate(booking.date)}</td>
                <td style={tableCellStyle}>{booking.booked}</td>
                <td style={tableCellStyle}>{new Date(booking.creation_date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* No Bookings Found */}
      {!loading && !error && bookings.length === 0 && (
        <p>You have no bookings.</p>
      )}
    </div>
  );
}

// Styles for the table (optional)
const tableHeaderStyle = {
  border: '1px solid #dddddd',
  textAlign: 'left',
  padding: '8px',
  backgroundColor: '#f2f2f2'
};

const tableCellStyle = {
  border: '1px solid #dddddd',
  textAlign: 'left',
  padding: '8px'
};

const tableRowStyle = {
  backgroundColor: '#ffffff'
};

export default ViewBookings;
