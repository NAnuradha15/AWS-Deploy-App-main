import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function BusManagement() {
  const [buses, setBuses] = useState([]);
  const [open, setOpen] = useState(false);
  const [newBus, setNewBus] = useState({
    busno: '',
    owner: '',
    routeno: '',
    seatingcap: ''
  });

  const navigation = useNavigate()
  const toMap = (bus) => {
    // Define the array of predefined coordinates
    const coordinates = [
      { lati: 6.903640, longi: 79.922776 },
      { lati: 6.933759, longi: 79.992625 },
      { lati: 6.911932, longi: 79.858390 },
      { lati: 6.839813, longi: 79.992739 }
    ];

    // Randomly select a coordinate from the array
    const randomIndex = Math.floor(Math.random() * coordinates.length);
    const selectedCoordinate = coordinates[randomIndex];

    // Add selected latitude and longitude to the bus object
    bus.lati = selectedCoordinate.lati;
    bus.longi = selectedCoordinate.longi;

    // Now pass the updated bus object to the Map page
    navigation('/Map', { state: { props: bus } });
  }

  useEffect(() => {
    axios.get('http://13.250.101.135:5000/bus/')
      .then(response =>
        // console.log(response.data.buses)
        setBuses(response.data.buses)
      )
      .catch(error => console.error('Error fetching buses:', error));
  }, []);

  const getallBuses = () => {
    axios.get('http://13.250.101.135:5000/bus/')
      .then(response =>
        // console.log(response.data.buses)
        setBuses(response.data.buses)
      )
      .catch(error => console.error('Error fetching buses:', error));
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setNewBus({ ...newBus, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    axios.post('http://13.250.101.135:5000/bus/addBus', newBus)
      .then(response => {
        setBuses([...buses, response.data]);
        handleClose();
        getallBuses();
      })
      .catch(error => console.error('Error adding bus:', error));
  };

  return (
    <div style={{ margin: '20px' }}>
      {
        JSON.parse(localStorage.getItem("user")).role === 'admin' ? (

          <Button style={{ float: 'right', margin: '10px' }} onClick={handleOpen} variant='outlined'>Add New Bus</Button>
        ) :
          <>

          </>
      }
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bus No</TableCell>
              <TableCell>Owner Name</TableCell>
              <TableCell>Route No</TableCell>
              <TableCell>Seating Capacity</TableCell>
              <TableCell>View in Map</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buses.map((bus) => (
              <TableRow key={bus.busno}>
                <TableCell>{bus.busno}</TableCell>
                <TableCell>{bus.owner}</TableCell>
                <TableCell>{bus.routeno}</TableCell>
                <TableCell>{bus.seatingcap}</TableCell>
                <TableCell><Button variant='contained' onClick={() => { toMap(bus) }}>View in Map</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box p={4} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', boxShadow: 24, padding: 4 }}>
          <h2>Add New Bus</h2>
          <TextField
            margin="normal"
            fullWidth
            label="Bus No"
            name="busno"
            value={newBus.busno}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Owner Name"
            name="owner"
            value={newBus.owner}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Route No"
            name="routeno"
            value={newBus.routeno}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Seating Capacity"
            name="seatingcap"
            value={newBus.seatingcap}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit} style={{ marginTop: '20px' }} variant='contained'>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default BusManagement;
