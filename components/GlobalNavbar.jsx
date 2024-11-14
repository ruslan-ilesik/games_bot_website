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
  const navbarRef = useRef(null);
  const navbarHeight = 55;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [user, setUser] = useState(null);
  const path = typeof window !== 'undefined' ? window.location.pathname : '';

  const menuItems = [
    { name: 'Home', href: '/', icon: 'fa-house' },
    { name: 'Commands', href: '/commands', icon: 'fa-terminal' },
    { name: 'Premium', href: '/premium', icon: 'fa-crown' },
    { name: 'Invite Bot!', href: 'https://discord.com/api/oauth2/authorize?client_id=729046239181668397&permissions=139586817088&scope=bot%20applications.commands', icon: 'fa-robot' },
  ];

  // Fetch user data from the Discord endpoint
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/discord/get-display-user-data');
        if (response.status === 403) {
          setUser(null); // User is not logged in
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

  const updateNavbarBottomPosition = () => {
    if (navbarRef.current) {
      const bottomPosition = navbarRef.current.getBoundingClientRect().bottom;
      if (navbarSizeRef) {
        navbarSizeRef.current = bottomPosition > 0 ? bottomPosition : 0;
      }
    }
  };

  useEffect(() => {
    updateNavbarBottomPosition();
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavbarVisible(currentScrollY < lastScrollY || currentScrollY === 0);
      lastScrollY = currentScrollY;
      updateNavbarBottomPosition();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar
      ref={navbarRef}
      style={{
        minHeight: `${navbarHeight}px`,
        padding: '0',
        margin: '0',
        width: '100vw',
        transition: 'transform 0.3s ease',
        transform: isNavbarVisible ? 'translateY(0)' : 'translateY(-100%)',
      }}
      fixed="top"
      maxWidth="full"
      className="top-block w-full darker-block"
      onMenuOpenChange={setIsMenuOpen}
    >
      <div className="container-fluid flex justify-between items-center w-full">
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

        <NavbarContent justify="end" className="flex gap-4">
          {user ? (
            <NavbarItem>
              <Link href="/dashboard">
                <img
                  src={user.avatarUrl}
                  className="profile_pic"
                  alt="User Avatar"
                />
                <Link href="/dashboard" color="foreground" style={{paddingRight:"10px"}}>
                  <span style={{ marginLeft: '8px'},{paddingTop:"8px"}}>{user.name}</span>
                </Link>
              </Link>
            </NavbarItem>
          ) : (
            <NavbarItem>
              <Link href="api/login-with-discord-redirect" color="foreground">
                <span className="fa fa-sign-in"></span>
                <span style={{ marginLeft: '8px' }}>Login</span>
              </Link>
            </NavbarItem>
          )}
        </NavbarContent>

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
