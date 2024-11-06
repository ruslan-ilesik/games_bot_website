'use client'
import React, {useRef} from 'react';
import RootLayout from '../layout';
import GlobalNavbar from '../../components/GlobalNavbar';
import Commands from "../../components/commands_page/Commands" 
import Footer from '../../components/Footer';


const IndexPage = () => {
  const navbarSizeRef = useRef(null);
  return (
    <RootLayout>
      <GlobalNavbar navbarSizeRef={navbarSizeRef}/>
      <Commands  navbarSizeRef={navbarSizeRef}/>
      <Footer/>
    </RootLayout>
  );

};  

export default IndexPage;
