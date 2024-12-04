'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Spacer } from '@nextui-org/react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import '../../styles/index_page.css';

const TopBlock = () => {
  const [count, setCount] = useState({
    guildCount: 0,
    gamesCount: 0,
    imagesCount: 0,
    usersCount: 0,
  });

  const targetValues = useRef(count);

  useEffect(() => {
    Aos.init({ duration: 1000 });

    const fetchCounters = async () => {
      try {
        const response = await fetch('/api/get-index-page-counters');
        const data = await response.json();

        const newCounts = {
          guildCount: parseInt(data.servers_cnt, 10),
          gamesCount: parseInt(data.games_cnt, 10),
          imagesCount: parseInt(data.images_cnt, 10),
          usersCount: parseInt(data.users_cnt, 10),
        };

        updateChangedCounters(newCounts);
      } catch (error) {
        console.error('Error fetching counter data:', error);
      }
    };

    const updateChangedCounters = (newCounts) => {
      const duration = 2000;
      const steps = 100;
      const interval = duration / steps;

      Object.keys(newCounts).forEach((key) => {
        if (newCounts[key] !== targetValues.current[key]) {
          let stepCount = 0;
          const initialValue = targetValues.current[key];
          const targetValue = newCounts[key];

          const intervalId = setInterval(() => {
            stepCount++;
            setCount((prevCount) => ({
              ...prevCount,
              [key]: Math.round(initialValue + ((targetValue - initialValue) / steps) * stepCount),
            }));

            if (stepCount >= steps) {
              clearInterval(intervalId);
              setCount((prevCount) => ({
                ...prevCount,
                [key]: targetValue,
              }));
              targetValues.current[key] = targetValue;  // Update target values to prevent re-animation
            }
          }, interval);
        }
      });
    };

    fetchCounters();
    const intervalId = setInterval(fetchCounters, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="darker-block inline-container header" style={{paddingTop:'64px'}}>
      <div style={{ marginLeft: '20px' }}>
        <div style={{ display: 'flex' }}>
          <div
            style={{ minWidth: 'calc(100vw - 256px)', textAlign: 'left', marginTop: '20px' }}
            data-aos="fade-down"
          >
            <h1 className="header">Games Bot For Discord</h1>
            <p className="header">
              Games bot gives you the ability to play the most favorite and
              popular table games directly in Discord. Just write a command and
              you are in.
            </p>
          </div>
        </div>

        <Spacer y={2} />

        <div className="counters-container" data-aos="flip-up">
          <div className="info-counter">
            <h2>Servers</h2>
            <span>{count.guildCount}+</span>
          </div>
          <div className="info-counter">
            <h2>Users</h2>
            <span>{count.usersCount}+</span>
          </div>
          <div className="info-counter">
            <h2>Images Generated</h2>
            <span>{count.imagesCount}+</span>
          </div>
          <div className="info-counter">
            <h2>Games Played</h2>
            <span>{count.gamesCount}+</span>
          </div>
        </div>
      </div>

      <div className="top-icon">
        <img
          data-aos="fade-left"
          src="/img/icon.svg"
          alt="Main Icon"
          style={{ maxWidth: '150px', filter: 'invert(100%)' }}
        />
      </div>
    </div>
  );
};

export default TopBlock;
