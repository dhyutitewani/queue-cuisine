'use client';

import { Bar, Line } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Define the structure of our data
interface TimeData {
  time: string;
  entries: number;
  exits: number;
}

const generateFakeData = (isWeekend: boolean): TimeData[] => {
  const times = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00',
  ];

  return times.map((time) => ({
    time,
    entries: Math.floor(Math.random() * (isWeekend ? 50 : 100)), // Reduce traffic on weekends
    exits: Math.floor(Math.random() * (isWeekend ? 50 : 100)),   // Reduce traffic on weekends
  }));
};

const generateFakeWeeklyData = () => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return daysOfWeek.map(day => ({
    day,
    times: generateFakeData(day === 'Saturday' || day === 'Sunday'),  // Set weekend flag
  }));
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState({
    weeklyData: [] as { day: string; times: TimeData[] }[],
  });

  const [entering, setEntering] = useState(1);  // Random number between 1 and 13
  const [exiting, setExiting] = useState(1); 
  
  useEffect(() => {
      // const eventSource = new EventSource('http://localhost:8000/real-data');

      // try {  
      //   eventSource.onmessage = function (event) {
      //     // Parse the incoming data
      //     const data = event.data;
      //     console.log("Received SSE:", event.data);

      //     // Match the data format (people_entering: 10, people_exiting: 5)
      //     const match = data.match(/people_entering: (\d+), people_exiting: (\d+)/);
      //     if (match) {
      //       setEntering(parseInt(match[1], 10));
      //       setExiting(parseInt(match[2], 10));
      //     }
      //   };
      // } catch (err) {
      //   console.error('Error fetching data:', err);
      // }

    const enteringInterval = setInterval(() => {
      setEntering((prev) => {
        if (prev < 12) {
          for (prev = 0; prev < 12; prev++) {
            return prev + 1;
          }
        } else {
          clearInterval(enteringInterval); // Stop incrementing when it reaches 12
          return prev;
        }
      });
    }, 5000); // Increment every second

    const exitingInterval = setInterval(() => {
      setExiting((prev) => {
        if (prev < 3) {
          for (prev = 0; prev < 3; prev++) {
            return prev + 1;
          }
        } else {
          clearInterval(exitingInterval); // Stop incrementing when it reaches 3
          return prev;
        }
      });
    }, 9000); // Increment every second
    
    const interval_fake_data = setInterval(() => {
      setData((prevData) => ({
        ...prevData,
        weeklyData: generateFakeWeeklyData(),
      }));
    }, 5000);
    
    // Cleanup both intervals when the component unmounts or on re-render
    return () => {
      // eventSource.close();
      // clearInterval(enteringInterval);
      // clearInterval(exitingInterval);
      clearInterval(interval_fake_data);
    };
  }, []);

  // Prepare data for Bar Chart (Peak Hours across the Days of the Week)
  const barChartData: ChartData<'bar'> = {
    labels: data.weeklyData.map((d) => d.day), // Days of the week
    datasets: [
      {
        data: data.weeklyData.map((d) =>
          d.times.reduce((sum: number, time: TimeData) => sum + time.entries + time.exits, 0)
        ),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Peak Hours Across the Week',
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Peak Hours (8 AM - 9 PM)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Days of the Week',
        },
      },
    },
  };

  // Prepare data for Line Chart (Entries and Exits over time)
  const lineChartData: ChartData<'line'> = {
    labels: data.weeklyData[0]?.times.map((d: TimeData) => d.time) || [], // Times of the day (from first day's data)
    datasets: [
      {
        label: 'Entries',
        data: data.weeklyData[0]?.times.map((d: TimeData) => d.entries) || [],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Exits',
        data: data.weeklyData[0]?.times.map((d: TimeData) => d.exits) || [],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Entries and Exits Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of People',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time of Day',
        },
      },
    },
  };

  return (
    <div>
      <div className="data-card mt-10 ml-20">
        <h1>Real-Time People Counting</h1>
      </div>
      <div className='flex flex-auto ml-32 mb-20 mx-auto'>
        <div className="data-card mt-10 mr-5">
          <h3>People Entering</h3>
          <p>{entering}</p>
        </div>
        <div className="data-card mt-10 ml-5">
          <h3>People Exiting</h3>
          <p>{exiting}</p>
        </div>
      </div>
      <div style={{ width: '90%', margin: '0 auto' }}>
        <h2>Real-Time Foot Traffic Dashboard</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          <div style={{ width: '45%', margin: '20px 0' }}>
            <Bar data={barChartData} options={barChartOptions} />
          </div>
          <div style={{ width: '45%', margin: '20px 0' }}>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
