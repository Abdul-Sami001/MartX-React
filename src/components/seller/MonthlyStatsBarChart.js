import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useVendorOrderStore from '../../stores/vendorOrderStore'; // Importing the vendor order store

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
  const navigate = useNavigate(); // For navigation
  const { orders, fetchVendorOrders } = useVendorOrderStore(); // Accessing orders from store
  const [monthlyOrders, setMonthlyOrders] = useState(new Array(12).fill(0)); // Array to store order count for each month

  // Function to categorize orders by month
  const categorizeOrdersByMonth = (orders) => {
    const ordersByMonth = new Array(12).fill(0); // Initialize an array for 12 months

    orders.forEach((order) => {
      const orderDate = new Date(order.placed_at); // Parse order date
      const month = orderDate.getMonth(); // Get the month (0 for Jan, 11 for Dec)
      ordersByMonth[month] += 1; // Increment the count for the respective month
    });

    setMonthlyOrders(ordersByMonth); // Update the state with calculated orders
  };

  useEffect(() => {
    if (orders.length === 0) {
      fetchVendorOrders(); // Fetch orders if not already fetched
    } else {
      categorizeOrdersByMonth(orders); // Categorize orders by month when orders are available
    }
  }, [orders, fetchVendorOrders]);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Number of Orders',
        data: monthlyOrders, // Use calculated orders by month
        borderColor: '#F47D31', // Vibrant Orange
        backgroundColor: '#0A0E23',
        borderWidth: 2,
        borderRadius: 30,
        hoverBackgroundColor: '#F47D31', // Dark Blue on hover
        hoverBorderColor: '#0A0E23', // Vibrant Orange on hover
        hoverBorderWidth: 2,
        barThickness: 20, // Adjust thickness of bars
        barPercentage: 0.2, // Adjust bar width
        categoryPercentage: 0.5 // Adjust category width
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
          label: function (context) {
            return `${context.dataset.label}: ${context.raw} orders`; // Display in orders
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: '#0A0E23', // Dark Blue for x-axis labels
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#0A0E23', // Dark Blue for y-axis labels
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const clickedIndex = elements[0].index; // Get index of the clicked bar
        navigate('/vendor-orders', { state: { month: clickedIndex } }); // Navigate with month info
      }
    },
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" shadow="md" height="300px">
      <Bar data={data} options={options} />
    </Box>
  );
};

export default MonthlyStatsBarChart;
