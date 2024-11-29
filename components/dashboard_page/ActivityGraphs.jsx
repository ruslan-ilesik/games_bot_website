  import React, { useEffect, useState, useRef } from 'react';
  import { Doughnut } from 'react-chartjs-2';
  import { Line } from 'react-chartjs-2';
  import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';

  // Register chart elements
  ChartJS.register(
    ArcElement, Tooltip, Legend, 
    CategoryScale, LinearScale, PointElement, LineElement, BarElement
  );

  const ActivityGraphs = () => {
    const [data, setData] = useState(null);
    const donutRef = useRef(null); // Define refs for charts
    const lineRef = useRef(null);

    // Fetch data from the API
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('/api/dashboard/get-activity-graphs');
        const result = await response.json();
        setData(result); // Set data state when fetched
      };

      fetchData();
    }, []); // Empty dependency array to fetch only once

    // Ensure the data exists before rendering charts
    if (!data) return <div>Loading...</div>;

    const transformData = (data) => {
      const days = data.commands_stats.map(item => item.day);
      const commands = data.commands_stats.map(item => parseInt(item.commands_amount));
      const games = data.games_stats.map(item => parseInt(item.games_played));
      const timePlayed = data.games_stats.map(item => parseInt(item.total_time_in_seconds));
      const winCount = parseInt(data.win_lose[0].win_count);
      const lossCount = parseInt(data.win_lose[0].loss_count);
      const drawCount = parseInt(data.win_lose[0].draw_count);

      return { days, commands, games, timePlayed, winCount, lossCount, drawCount };
    };

    const { days, commands, games, timePlayed, winCount, lossCount, drawCount } = transformData(data);

    const donutData = {
      labels: ['Wins', 'Losses', 'Draws'],
      datasets: [{
        data: [winCount, lossCount, drawCount],
        backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
        hoverOffset: 4,
      }],
      options: { 
        legend: {
            labels: {
              fontColor: 'white'
            }
          }
        }
    };

    const timeData = {
      labels: days,
      datasets: [{
        label: 'Time Played (seconds)',
        data: timePlayed,
        borderColor: '#007bff',
        backgroundColor: 'rgba(0,123,255,0.1)',
        fill: true,
      }],
    };

    const commandsAndGamesData = {
      labels: days,
      datasets: [
        {
          label: 'Commands Used',
          data: commands,
          borderColor: '#ffc107',
          backgroundColor: 'rgba(255,193,7,0.1)',
          fill: true,
        },
        {
          label: 'Games Played',
          data: games,
          borderColor: '#007bff',
          backgroundColor: 'rgba(0,123,255,0.1)',
          fill: true,
        },
      ],
      options: { 
        legend: {
            labels: {
              fontColor: 'white'
            }
          }
        }
    };

    const donutOptions = {
      plugins: {
        legend: {
          labels: {
            color: 'white', // Set legend text color to white
          },
        },
      },
    };
    
    const timeOptions = {
      plugins: {
        legend: {
          labels: {
            color: 'white', // Set legend text color to white
          },
        },
      },
      scales: {
        x: {
          ticks: { color: 'white' }, // Set x-axis ticks color
          grid: { color: 'rgba(255, 255, 255, 0.1)' }, // Optional: Adjust gridline color
        },
        y: {
          ticks: { color: 'white' }, // Set y-axis ticks color
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
        },
      },
    };
    
    const commandsAndGamesOptions = {
      plugins: {
        legend: {
          labels: {
            color: 'white', // Set legend text color to white
          },
        },
      },
      scales: {
        x: {
          ticks: { color: 'white' }, // Set x-axis ticks color
          grid: { color: 'rgba(255, 255, 255, 0.1)' }, // Optional: Adjust gridline color
        },
        y: {
          ticks: { color: 'white' }, // Set y-axis ticks color
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
        },
      },
    };
    


    const handleResize = () => {
      if (window.resizeTimeout) {
        clearTimeout(window.resizeTimeout); // Clear the previous timeout
      }
      window.resizeTimeout = setTimeout(() => {
        if (donutRef.current) {
          donutRef.current.update();
        }
        if (lineRef.current) {
          lineRef.current.update();
        }
      }, 200); // 200ms delay before executing the resize logic
    };


      window.addEventListener('resize', handleResize);


    return (
      <div className='fonts-assign'>
        <h1 className="headers-font text-highlight text-center" style={{ fontSize: '2.3em' }}>Activity Overview</h1>
        <div className='darker-block pb-4 mb-4'>
        <div className="charts-container">
          <div className="chart-item doughnut-div">
            <h3>Wins, Losses, and Draws</h3>
            <Doughnut data={donutData} options={donutOptions} ref={donutRef} />
          </div>
          <div className="chart-item">
            <h3>Time Played per Day</h3>
            <Line data={timeData} options={timeOptions} ref={lineRef} />
          </div>
          <div className="chart-item">
            <h3>Commands Used vs. Games Played</h3>
            <Line data={commandsAndGamesData} options={commandsAndGamesOptions} ref={lineRef} />
          </div>
        </div>
        </div>
      </div>
    );
  };

  export default ActivityGraphs;
