import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box } from '@chakra-ui/react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const roundedTopPlugin = {
  id: 'roundedTopPlugin',
  beforeDraw: (chart) => {
    const { ctx, data, chartArea } = chart;
    if (!chartArea) return;
    const { top, bottom, left, right } = chartArea;

    data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      meta.data.forEach((bar, index) => {
        const { x, y, width, height } = bar;
        const radius = 10; // Radius for top corners
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x - width / 2, y);
        ctx.lineTo(x + width / 2, y);
        ctx.lineTo(x + width / 2, y - height + radius);
        ctx.arc(x + width / 2 - radius, y - height + radius, radius, 0, Math.PI, true);
        ctx.lineTo(x - width / 2 + radius, y - height + radius);
        ctx.arc(x - width / 2 + radius, y - height + radius, radius, Math.PI, 0, true);
        ctx.lineTo(x - width / 2, y);
        ctx.closePath();
        ctx.clip();
        ctx.fillStyle = dataset.backgroundColor;
        ctx.fill();
        ctx.restore();
      });
    });
  },
};



const MonthlyStatsBarChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [1200, 1500, 1800, 1400, 1600, 1700, 2000, 1900, 2100, 2300, 2200, 2500], // Replace with your data
        borderColor:'#F47D31',// Vibrant Orange
        backgroundColor: '#0A0E23' ,
        borderWidth: 2,
        borderRadius: 30, 
        hoverBackgroundColor: '#F47D31', // Dark Blue on hover
        hoverBorderColor: '#0A0E23', // Vibrant Orange on hover
        hoverBorderWidth: 2,
         // Adjust bar thickness and spacing
         barThickness: 20, // Adjust this value to change the thickness of the bars
         // Alternatively, use these options for responsive sizing
         barPercentage: 2, // Adjust this to control the width of the bars relative to the category width
         categoryPercentage: 0.1 // Adjust this to control the width of the category
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
            color: '#0A0E23', // Dark Blue for legend text
          },
      },
      tooltip: {
        backgroundColor: '#0A0E23', // Dark Blue background for tooltip
        titleColor: '#F47D31', // Vibrant Orange for title
        bodyColor: '#FFFFFF', // White for body text
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw} units`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      }
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" shadow="md" height="300px"> {/* Adjust height to make chart smaller */}
    <Bar data={data} options={options} />
  </Box>
  );
};

export default MonthlyStatsBarChart;
