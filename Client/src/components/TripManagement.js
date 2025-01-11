import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import { styled } from '@mui/system';

// Styling for the modal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

// Styled container for the table
const Container = styled('div')({
  padding: '20px',
});

function TripManagement() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // State for modal
  const [open, setOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [seatsToBook, setSeatsToBook] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState('');

  // Fetch trips data from API
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('http://13.250.101.135:5000/bus/');
        setTrips(response.data.buses);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching trips:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  // Handle opening the modal
  const handleOpen = (trip) => {
    setSelectedTrip(trip);
    setSeatsToBook(1);
    setBookingError('');
    setBookingSuccess('');
    // Set default date to today or trip's date if applicable
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    setOpen(true);
  };

  // Handle closing the modal
  const handleClose = () => {
    setOpen(false);
    setSelectedTrip(null);
    setSeatsToBook(1);
    setSelectedDate('');
    setBookingError('');
    setBookingSuccess('');
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedTrip) return;

    // Validate seatsToBook
    if (seatsToBook < 1) {
      setBookingError('Please book at least one seat.');
      return;
    }

    if (seatsToBook > selectedTrip.seatingcap) {
      setBookingError(
        `Only ${selectedTrip.seatingcap} seat(s) available.`
      );
      return;
    }

    // Validate selectedDate
    if (!selectedDate) {
      setBookingError('Please select a date for your booking.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (selectedDate < today) {
      setBookingError('Selected date cannot be in the past.');
      return;
    }

    try {
      // Prepare data to send

      console.log('selectedTrip', selectedTrip);

      console.log('user', JSON.parse(localStorage.getItem("user")).id);
      const bookingData = {
        busno: selectedTrip.busno, // Ensure using the correct ID field
        booked: seatsToBook,
        user: JSON.parse(localStorage.getItem("user")).id, // Replace with actual user ID if available
        date: selectedDate,
      };

      const bookBus = {
        seats: seatsToBook,
        busId: selectedTrip._id, // Ensure using the correct ID field 
      }




      // Send PUT request to addtrip API
      const response = await axios.post('http://13.250.101.135:5000/trip/addTrip', bookingData);
      const resBookBus = await axios.post(`http://13.250.101.135:5000/bus/book`, bookBus);

      // Handle success
      setBookingSuccess('Seats booked successfully!');

      // Optionally, update the trips state to reflect the new available seats
      setTrips((prevTrips) =>
        prevTrips.map((trip) =>
          trip._id === selectedTrip._id
            ? { ...trip, seatingcap: trip.seatingcap - seatsToBook }
            : trip
        )
      );

      // Reset the selected trip's available seats
      setSelectedTrip((prevTrip) => ({
        ...prevTrip,
        seatingcap: prevTrip.seatingcap - seatsToBook,
      }));

      // Close the modal after a delay
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err) {
      console.error('Error booking seats:', err);
      setBookingError('Failed to book seats. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ textAlign: 'center', marginTop: '50px' }}>
        <Alert severity="error">
          Failed to load trips. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Book a New Trip
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Route No</TableCell>
            <TableCell>Bus No</TableCell>
            <TableCell>Available Seats</TableCell>
            <TableCell>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trips.map((trip) => (
            <TableRow key={trip._id}>
              <TableCell>{trip.routeno}</TableCell>
              <TableCell>{trip.busno}</TableCell>
              <TableCell>{trip.seatingcap}</TableCell>
              <TableCell>
                {trip.seatingcap > 0 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpen(trip)}
                  >
                    Book a Seat
                  </Button>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    Fully Booked
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Booking Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="booking-modal-title"
        aria-describedby="booking-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="booking-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Book Seats
          </Typography>
          <hr></hr>
          {selectedTrip && (
            <>
              <Typography variant="body1">
                <strong>Route No:</strong> {selectedTrip.routeno}
              </Typography>
              <Typography variant="body1">
                <strong>Bus No:</strong> {selectedTrip.busno}
              </Typography>
              {/* Removed displaying trip.date since user selects date */}
              <TextField
                label="Booking Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: {
                    min: new Date().toISOString().split('T')[0],
                  },
                }}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Typography variant="body1" gutterBottom>
                <strong>Available Seats:</strong> {selectedTrip.seatingcap}
              </Typography>
              <TextField
                label="Number of Seats"
                type="number"
                InputProps={{ inputProps: { min: 1, max: selectedTrip.seatingcap } }}
                value={seatsToBook}
                onChange={(e) => setSeatsToBook(Number(e.target.value))}
                fullWidth
                margin="normal"
              />
              {bookingError && (
                <Alert severity="error" style={{ marginBottom: '10px' }}>
                  {bookingError}
                </Alert>
              )}
              {bookingSuccess && (
                <Alert severity="success" style={{ marginBottom: '10px' }}>
                  {bookingSuccess}
                </Alert>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth
              >
                Submit
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
}

export default TripManagement;
