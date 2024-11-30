'use client'
import React, {useRef} from 'react';
import RootLayout from '../layout';
import GlobalNavbar from '../../components/GlobalNavbar';
import Footer from '../../components/Footer';
import { usePremium } from '../../components/PremiumContext';
import DashboardHeader from "../../components/dashboard_page/DashboardHeader";
import HistoryTable from '../../components/dashboard_page/HistoryTable';
import ActivityGraphs from '../../components/dashboard_page/ActivityGraphs';
import AchievementsReport from '../../components/dashboard_page/AchievementsReport';

const PremiumPage = () => {
  const navbarSizeRef = useRef(null);
  const { isPremium } = usePremium();
  const handleLogout = () => {
    window.location.href = "/action/discord/logout"; // Redirect to logout endpoint
  };

  return (
    <RootLayout className="fonts-assign">
      <GlobalNavbar navbarSizeRef={navbarSizeRef}/>
      <DashboardHeader/>
      <HistoryTable/>
      <ActivityGraphs/>
      <AchievementsReport/>
      <div className="logout-button-container fonts-assign">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <Footer/>
    </RootLayout>
  );

};  

export default PremiumPage;
