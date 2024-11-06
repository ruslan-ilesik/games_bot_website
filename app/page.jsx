'use client'
import React from 'react';
import RootLayout from './layout';
import GlobalNavbar from '../components/GlobalNavbar'; 
import IndexContent from '../components/index_page/IndexContent'
import RatingCarousel from '../components/index_page/RatingCarousel'
import TopBlock from '../components/index_page/TopBlock';
import InviteSection from '../components/index_page/InviteSection';
import Footer from '../components/Footer';

const IndexPage = () => {
  return (
    <RootLayout>
      <GlobalNavbar/>
      <TopBlock/>
      <IndexContent/>
      <RatingCarousel/>
      <InviteSection/>
      <Footer/>
    </RootLayout>
  );

};  

export default IndexPage;
