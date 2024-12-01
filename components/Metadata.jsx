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
  let keywords = ' discord bot, games bot, discord games, multiplayer games, free games, achievements, fun games, invite discord bot, ilesik, fun, social, bot, chat, multiplayer, table games, commands, single player games, party games, trivia games, puzzle games, roleplaying games, strategy games, card games, casual games, competitive games, cooperative games, co-op games, leaderboard, gaming community, game invites, mini-games, gaming experience, discord server games, interactive games, team games, gaming bots, bot for discord, discord games collection, gaming fun, social gaming, Discord RPG, text-based games, board games, fun bot, online multiplayer, casual bot, bot for gaming, fun for friends, free multiplayer games, Discord entertainment, game modes, idle games, game events, in-game challenges, interactive trivia, games for all ages, virtual pets, gaming tournaments, bot rewards, in-game progression, co-op multiplayer, competitive play, game mechanics, group gaming, squad challenges, achievements system, virtual economy, in-game store, custom game modes, team-building games, squad-based play, text adventure games, fantasy games, puzzle-solving, escape room games, virtual worlds, simulation games, online challenges, game quizzes, strategy puzzles, bot games, Discord gaming companion, invite rewards, game leaderboards, game statistics tracking, player rankings, live game updates, game notifications, active gaming community, Discord gaming bot, game achievements tracker, interactive puzzles, roleplay games, battle games, competitive gaming bot, online trivia, quiz challenges, fun multiplayer, game sessions, bot challenges, Discord fun games, invite a bot to play';

  if (window.location.pathname == "/commands"){
    title = "Commands page for " + title
    keywords = 'commands page, ' + keywords;
  }
  if (window.location.pathname == '/dashboard'){
    title = "Dashboard for " + title
    keywords = 'dashboard page, dashboard, ' + keywords;
  }
  if (window.location.pathname == '/premium'){
    title = "Premium page for " + title
    keywords = 'premium page, premium, ' + keywords;
  }

  return (
    <head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} /> 

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
      <meta name="google-site-verification" content="4XJe6bRODN9E7nx6Ej9uvgnLNp88_vxN-WUhqRACE04" />

      {/* Preload & Prefetch (Optional for Performance) */}
      <link rel="preload" as="image" href={image} />
      <link rel="prefetch" href={url} />
    </head>
  );
};

export default Metadata;
