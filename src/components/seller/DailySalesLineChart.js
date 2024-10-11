import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Heading } from '@chakra-ui/react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DailySalesLineChart = () => {
  // Sample sales data for each day of the week
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Daily Sales',
        data: [300, 400, 200, 500, 700, 800, 600], // Sales values for each day
        borderColor: '#F47D31',  // Line color to match your color scheme
        backgroundColor: 'rgba(244, 125, 49, 0.3)', // Line fill
        fill: true,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Important for controlling height
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.raw}`, // Add a dollar sign to the label
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value}`, // Add dollar sign to y-axis labels
        },
      },
    },
  };

  return (
    <Box bg="white" p="4" borderRadius="md" boxShadow="md" border="1px solid #E2E8F0" height="150px">
     
      <Box height="100px"> {/* Reduced height for the line chart */}
        <Line data={data} options={options} />
      </Box>
    </Box>
  );
};

export default DailySalesLineChart;
