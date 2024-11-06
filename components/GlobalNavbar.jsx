'use client'; // Important for Next.js 13's app directory

import React, { useEffect, useRef, useState } from 'react';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from '@nextui-org/react';

const GlobalNavbar = ({ navbarSizeRef }) => {
  const isLoggedIn = false;
  const navbarRef = useRef(null);
  const navbarHeight = isLoggedIn ? 70 : 55;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true); // State for navbar visibility
  const path = typeof window !== 'undefined' ? window.location.pathname : '';

  const menuItems = [
    { name: 'Home', href: '/', icon: 'fa-house' },
    { name: 'Commands', href: '/commands', icon: 'fa-terminal' },
    { name: 'Premium', href: '/premium', icon: 'fa-crown' },
    { name: 'Invite Bot!', href: 'https://discord.com/api/oauth2/authorize?client_id=729046239181668397&permissions=139586817088&scope=bot%20applications.commands', icon: 'fa-robot' },
  ];

  // Update navbarSizeRef and bottom position of the navbar on scroll or resize
  const updateNavbarBottomPosition = () => {
    if (navbarRef.current) {
      const bottomPosition = navbarRef.current.getBoundingClientRect().bottom;
      if (navbarSizeRef) {
        navbarSizeRef.current = bottomPosition > 0? bottomPosition : 0;
      }
    }
  };

  useEffect(() => {
    // Set initial navbar bottom position
    updateNavbarBottomPosition();

    // Track resize events to recalculate navbar position
    //const handleResize = () => {
    //  updateNavbarBottomPosition();
    //};

    //window.addEventListener('resize', handleResize);

    //return () => {
   //   window.removeEventListener('resize', handleResize);
   // };
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Toggle navbar visibility based on scroll direction
      setIsNavbarVisible(currentScrollY < lastScrollY || currentScrollY === 0);
      lastScrollY = currentScrollY;
      updateNavbarBottomPosition(); // Update navbarSizeRef on scroll
    };

    ///window.addEventListener('scroll', handleScroll);
    //return () => {
    //  window.removeEventListener('scroll', handleScroll);
   // };
  }, []);

  return (
    <Navbar
      ref={navbarRef}
      style={{
        minHeight: `${navbarHeight}px`,
        padding: '0',
        margin: '0',
        width: '100vw',
        transition: 'transform 0.3s ease', // Smooth transition for hiding/showing
        transform: isNavbarVisible ? 'translateY(0)' : 'translateY(-100%)', // Move navbar out of view when hidden
      }}
      fixed="top"
      maxWidth="full"
      className="top-block w-full darker-block"
      onMenuOpenChange={setIsMenuOpen}
    >
      <div className="container-fluid flex justify-between items-center w-full">
        {/* Mobile menu toggle button */}
        <NavbarContent className="sm:hidden">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            style={{
              width: '50px',
              height: '50px',
              padding: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </NavbarContent>

        {/* Left side navigation */}
        <NavbarContent justify="start" className="hidden sm:flex gap-4">
          {menuItems.map((item, index) => (
            <NavbarItem key={index} className={(item.href === path ? 'current-page ' : '') + (item.href === '/premium' ? 'premium-user ' : '')}>
              <Link href={item.href} color="foreground">
                <span className={`fa-solid ${item.icon}`}></span>
                <span style={{ marginLeft: '8px' }}>{item.name}</span>
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Right side login/logout */}
        <NavbarContent justify="end" className="flex gap-4">
          {isLoggedIn ? (
            <NavbarItem>
              <Link href="/dashboard">
                <img
                  height="50"
                  src="https://example.com/avatar.jpg"
                  className="profile_pic"
                  alt="User Avatar"
                />
                <span className="premiumClass">JohnDoe</span>
              </Link>
            </NavbarItem>
          ) : (
            <NavbarItem>
              <Link href="[[ discord_login_url ]]" color="foreground">
                <span className="fa fa-sign-in"></span>
                <span style={{ marginLeft: '8px' }}>Login</span>
              </Link>
            </NavbarItem>
          )}
        </NavbarContent>

        {/* Collapsible mobile menu */}
        <NavbarMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={index} className={item.href === path ? 'current-page' : ''}>
              <Link href={item.href} color="foreground" className="w-full">
                <span className={`fa-solid ${item.icon}`}></span>
                <span style={{ marginLeft: '8px' }}>{item.name}</span>
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </div>
    </Navbar>
  );
};

export default GlobalNavbar;
