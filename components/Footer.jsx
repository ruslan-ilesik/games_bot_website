'use client';
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer darker-block text-white py-4" >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center footer-div" >
        <div className="flex items-center">
          <img src="/img/ilesik.webp" alt="Ilesik Icon" className="w-8 h-8 mr-2" />
          <span>Made by ilesik</span>
        </div>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="/documents/privacy_policy.pdf" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/documents/terms_and_conditions.pdf" className="hover:underline">
            Terms of Service
          </a>
          <a href="https://github.com/ruslan-ilesik/games_bot" className="hover:underline" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
