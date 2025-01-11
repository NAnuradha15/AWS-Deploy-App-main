// components/Navbar.js

import React, { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Adjust the path if necessary

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext); // Access user and setUser from context

  // State for the Trip Management menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Handlers for Trip Management menu
  const handleTripClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTripClose = () => {
    setAnchorEl(null);
  };

  const handleBookTrip = () => {
    navigate('/book-trip');
    handleTripClose();
  };

  const handleViewBookings = () => {
    navigate('/view-bookings');
    handleTripClose();
  };

  const handleCreateTrip = () => {
    navigate('/create-trip');
    handleTripClose();
  };

  // Handlers for Login and Logout
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    // Clear user from localStorage
    localStorage.removeItem('user');

    // Update user state in context
    setUser(null);

    // Optionally, navigate to home or login page
    navigate('/login');
  };

  const handleBusClick = () => {
    navigate('/bus');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <div>
            <div style={{ fontSize: 25, cursor: 'pointer' }} onClick={() => navigate('/')}>
              Bus Information System
            </div>
          </div>
          <div>
            <Button color="inherit" onClick={handleBusClick}>
              Bus Management
            </Button>

            {/* Trip Management Dropdown */}
            <Button
              color="inherit"
              onClick={handleTripClick}
              aria-controls={open ? 'trip-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              Trip Management
            </Button>
            <Menu
              id="trip-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleTripClose}
              MenuListProps={{
                'aria-labelledby': 'trip-button',
              }}
            >
              <MenuItem onClick={handleBookTrip}>Book a New Trip</MenuItem>
              <MenuItem onClick={handleViewBookings}>View My Bookings</MenuItem>
         
            </Menu>

            {/* Conditionally Render Login or Logout Button */}
            {!user ? (
              <Button color="inherit" onClick={handleLoginClick}>
                Login
              </Button>
            ) : (
              <Button color="error" onClick={handleLogoutClick}>
                Logout
              </Button>
            )}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
