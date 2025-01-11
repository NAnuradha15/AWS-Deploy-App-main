// App.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import BusManagement from './components/BusManagement';
import UserManagement from './components/UserManagement';
import TripManagement from './components/TripManagement';
import ViewBookings from './components/ViewBookings';
import TripCreate from './components/TripCreate';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import Map from './components/Map';

function App() {
  return (
    <>
      <Navbar /> {/* Navbar is placed outside Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route 
          path="/bus" 
          element={
            <ProtectedRoute>
              <BusManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user" 
          element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/book-trip" 
          element={
            <ProtectedRoute>
              <TripManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/view-bookings" 
          element={
            <ProtectedRoute>
              <ViewBookings />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/Map" 
          element={
            <ProtectedRoute>
              <Map />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App;
