'use client'
import React, {useRef} from 'react';
import RootLayout from '../layout';
import GlobalNavbar from '../../components/GlobalNavbar';
import Footer from '../../components/Footer';
import PremiumFeaturesTable from '../../components/premium/PremiumFeaturesTable';
import { usePremium } from '../../components/PremiumContext';
import '../../styles/premium_page.css';

const PremiumPage = () => {
  const navbarSizeRef = useRef(null);
  const { isPremium } = usePremium();
  return (
    <RootLayout className="fonts-assign">
      <GlobalNavbar navbarSizeRef={navbarSizeRef}/>
      <div  className="container mx-auto mt-16 px-4 ">
        <PremiumFeaturesTable />
      </div>
      <div className="container mx-auto mt-8 mb-16 px-4 text-center">
        <div className="intro-container">
        {isPremium ? (
          <h1 className="text-highlight text-center" style={{fontSize:"1.5em"}}>
            You already have premium. Thank you for your support! 😊
          </h1>
        ) : (
          <a
            href="/api/buy-premium-redirect"
            className="inline-block px-8 py-4 text-xl text-white font-extrabold bg-green-700 rounded-lg shadow-md hover:bg-green-800 transform transition-transform duration-300 hover:scale-105 pulse-button"
          >
            Subscribe Now!
          </a>
        )}
        </div>
      </div>

      <Footer/>
    </RootLayout>
  );

};  

export default PremiumPage;
