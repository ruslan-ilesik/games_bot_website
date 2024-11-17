'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context
const PremiumContext = createContext({
  isPremium: false,
  premiumStatus: 'NO_SUBSCRIPTION',
  setPremium: () => {}, // Placeholder
});

// Create a provider component
export const PremiumProvider = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [premiumStatus, setPremiumStatus] = useState('NO_SUBSCRIPTION');

  // Fetch premium status and update global state
  useEffect(() => {
    const fetchPremiumStatus = async () => {
      try {
        const response = await fetch('/api/get-user-premium-status');
        if (response.ok) {
          const data = await response.json();
          setPremiumStatus(data.status);
          setIsPremium(data.status !== 'NO_SUBSCRIPTION');
        }
      } catch (error) {
        console.error('Error fetching premium status:', error);
      }
    };

    fetchPremiumStatus();
  }, []);

  return (
    <PremiumContext.Provider
      value={{
        isPremium,
        premiumStatus,
        setPremium: (status) => {
          setPremiumStatus(status);
          setIsPremium(status !== 'NO_SUBSCRIPTION');
        },
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
};

// Custom hook for easy access to premium status
export const usePremium = () => useContext(PremiumContext);
