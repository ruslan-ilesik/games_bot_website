'use client'; // Important for Next.js 13's app directory

import React, { createContext, useEffect, useState, useContext, Children } from 'react';


const UserContext = createContext(null);


export const useUser = () => {
  return useContext(UserContext);
};


export const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState(null);   

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
            avatarUrl: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
      }
    };
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
