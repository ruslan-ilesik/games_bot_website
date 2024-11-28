'use client'; // Important for Next.js 13's app directory

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const UserContext = createContext(null);

// Custom hook to access context
export const useUser = () => {
  return useContext(UserContext);
};

// Provider component
export const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/discord/get-display-user-data');
        if (response.status === 403) {
          setUser(null);
        } else if (response.ok) {
          const userData = await response.json();
          setUser({
            name: userData.username,
            avatarUrl: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`,
            avatar: userData.avatar != ""
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
      } finally {
        setLoading(false); // Mark data fetch as complete
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    // Block rendering until loading is complete
    return <div>Loading...</div>;
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};