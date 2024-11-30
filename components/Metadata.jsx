import React from 'react';
import Head from 'next/head';

const Metadata = () => {
  // Local metadata specific to this page
  let title = 'Games Bot - The Discord bot to bring fun to your server!';
  const description = 'Elevate your Discord server with Games Bot! Explore free games, unlock achievements, and enjoy seamless multiplayer experiences. Whether solo or with friends, it brings joy, laughter, and excitement. Make the best decision for endless fun – invite today!';
  const url = 'https://gamesbot.lesikr.com';
  const image = '/img/icon.png';
  const themeColor = '#23272A';
  const twitterHandle = '';

  if (window.location.pathname == "/commands"){
    title = "Commands page for " + title
  }
  if (window.location.pathname == '/dashboard'){
    title = "Dashboard for " + title
  }
  if (window.location.pathname == '/premium'){
    title = "Premium page for " + title
  }

  return (
    <head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Meta Tags */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:site" content={twitterHandle} />
      <meta property="twitter:creator" content={twitterHandle} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content={themeColor} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href={image} />
      <link rel="apple-touch-icon" href={image} />

      {/* Preload & Prefetch (Optional for Performance) */}
      <link rel="preload" as="image" href={image} />
      <link rel="prefetch" href={url} />
    </head>
  );
};

export default Metadata;
