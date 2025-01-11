// context/UserContext.js

import React, { createContext, useState, useEffect } from 'react';

// Create the UserContext with default value null
export const UserContext = createContext(null);

// Create a Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Initialize user state from localStorage when the app loads
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Listen for changes to localStorage (e.g., from other tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
