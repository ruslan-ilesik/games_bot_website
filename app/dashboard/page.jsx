'use client'
import React, {useRef} from 'react';
import RootLayout from '../layout';
import GlobalNavbar from '../../components/GlobalNavbar';
import Footer from '../../components/Footer';
import { usePremium } from '../../components/PrmeiumContext';


const PremiumPage = () => {
  const navbarSizeRef = useRef(null);
  const { isPremium } = usePremium();
  return (
    <RootLayout className="fonts-assign">
      <GlobalNavbar navbarSizeRef={navbarSizeRef}/>
      <Footer/>
    </RootLayout>
  );

};  

export default PremiumPage;
