// TripCreate.js

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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/lab';

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

// Styled container for the table and button
const Container = styled('div')({
  padding: '20px',
});

function TripCreate() {
  const [trips, setTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [errorTrips, setErrorTrips] = useState(null);

  // State for the Create Trip modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // State for form inputs
  const [buses, setBuses] = useState([]);
  const [loadingBuses, setLoadingBuses] = useState(true);
  const [errorBuses, setErrorBuses] = useState(null);

  const [selectedBus, setSelectedBus] = useState('');
  const [tripDate, setTripDate] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');

  // Fetch trip data
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('/api/getTrips'); // Adjust the endpoint as necessary
        setTrips(response.data.AddUser || response.data.trips || []);
        setLoadingTrips(false);
      } catch (error) {
        console.error('Error fetching trips:', error);
        setErrorTrips(error.message);
        setLoadingTrips(false);
      }
    };

    fetchTrips();
  }, []);

  // Fetch buses data for the dropdown
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get('http://13.250.101.135:5000/bus/'); // Adjust the endpoint as necessary
        setBuses(response.data.buses || []);
        setLoadingBuses(false);
      } catch (error) {
        console.error('Error fetching buses:', error);
        setErrorBuses(error.message);
        setLoadingBuses(false);
      }
    };

    fetchBuses();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous messages
    setSubmitSuccess('');
    setSubmitError('');

    // Basic validation
    if (!selectedBus) {
      setSubmitError('Please select a bus.');
      return;
    }

    if (!tripDate) {
      setSubmitError('Please select a trip date.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        busno: selectedBus,
        tripdate: tripDate, // Ensure backend expects this format
      };

      const response = await axios.post('/api/createTrip', payload); // Adjust the endpoint as necessary

      setSubmitSuccess('Trip created successfully!');
      setSubmitting(false);
      handleClose();

      // Optionally, refresh the trips data
      setLoadingTrips(true);
      const tripsResponse = await axios.get('/api/getTrips');
      setTrips(tripsResponse.data.AddUser || tripsResponse.data.trips || []);
      setLoadingTrips(false);
    } catch (error) {
      console.error('Error creating trip:', error);
      setSubmitError(
        error.response?.data?.message || 'Failed to create trip. Please try again.'
      );
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Trip Management
      </Typography>

      {/* Button to open the Create Trip modal */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        style={{ marginBottom: '20px' }}
      >
        Create New Trip
      </Button>

      {/* Display loading spinner or error message */}
      {loadingTrips ? (
        <CircularProgress />
      ) : errorTrips ? (
        <Alert severity="error">{errorTrips}</Alert>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bus No</TableCell>
              <TableCell>Route</TableCell>
              <TableCell>Trip Date</TableCell>
              <TableCell>Available Seatings</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No trips available.
                </TableCell>
              </TableRow>
            ) : (
              trips.map((trip) => (
                <TableRow key={trip._id}>
                  <TableCell>{trip.busno}</TableCell>
                  <TableCell>{trip.route}</TableCell>
                  <TableCell>
                    {new Date(trip.tripdate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{trip.availableSeatings}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {/* Create Trip Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-trip-modal-title"
        aria-describedby="create-trip-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="create-trip-modal-title" variant="h6" component="h2" gutterBottom>
            Create New Trip
          </Typography>

          {/* Display loading spinner or error message for buses */}
          {loadingBuses ? (
            <CircularProgress />
          ) : errorBuses ? (
            <Alert severity="error">{errorBuses}</Alert>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Bus Selection */}
              <FormControl fullWidth margin="normal">
                <InputLabel id="bus-select-label">Bus No</InputLabel>
                <Select
                  labelId="bus-select-label"
                  id="bus-select"
                  value={selectedBus}
                  label="Bus No"
                  onChange={(e) => setSelectedBus(e.target.value)}
                  required
                >
                  {buses.map((bus) => (
                    <MenuItem key={bus._id} value={bus.busno}>
                      {bus.busno} - {bus.routeno}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Trip Date Selection */}
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                  label="Trip Date"
                  value={tripDate}
                  onChange={(newValue) => {
                    setTripDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth margin="normal" required />
                  )}
                />
              </LocalizationProvider>

              {/* Display submission error or success message */}
              {submitError && (
                <Alert severity="error" style={{ marginTop: '10px' }}>
                  {submitError}
                </Alert>
              )}
              {submitSuccess && (
                <Alert severity="success" style={{ marginTop: '10px' }}>
                  {submitSuccess}
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '20px' }}
                disabled={submitting}
              >
                {submitting ? <CircularProgress size={24} /> : 'Submit'}
              </Button>
            </form>
          )}
        </Box>
      </Modal>
    </Container>
  );
}

export default TripCreate;
