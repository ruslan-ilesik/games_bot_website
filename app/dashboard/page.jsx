'use client'
import React, {useRef} from 'react';
import RootLayout from '../layout';
import GlobalNavbar from '../../components/GlobalNavbar';
import Footer from '../../components/Footer';
import { usePremium } from '../../components/PremiumContext';
import DashboardHeader from "../../components/dashboard_page/DashboardHeader";
import HistoryTable from '../../components/dashboard_page/HistoryTable';

const PremiumPage = () => {
  const navbarSizeRef = useRef(null);
  const { isPremium } = usePremium();
  return (
    <RootLayout className="fonts-assign">
      <GlobalNavbar navbarSizeRef={navbarSizeRef}/>
      <DashboardHeader/>
      <HistoryTable/>
      <Footer/>
    </RootLayout>
  );

};  

export default PremiumPage;
