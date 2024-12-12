import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Box } from '@chakra-ui/react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import useVendorOrderStore from '../../stores/vendorOrderStore'; // Importing the vendor order store

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DailySalesLineChart = () => {
  const { orders, fetchVendorOrders } = useVendorOrderStore(); // Access orders from the store
  const [dailySales, setDailySales] = useState(new Array(7).fill(0)); // Initialize sales array for 7 days
  const navigate = useNavigate();

  // Get the current day index (adjusted to start from Monday)
  const getCurrentDayIndex = () => {
    const today = new Date().getDay(); // 0 for Sunday, 1 for Monday, etc.
    return (today + 6) % 7; // Adjust to make week start from Monday
  };

  const [currentDayIndex, setCurrentDayIndex] = useState(getCurrentDayIndex()); // Set current day index

  // Function to categorize sales by day of the week
  const categorizeSalesByDay = (orders) => {
    const salesByDay = new Array(7).fill(0); // Array for sales in each day (Monday to Sunday)

    orders.forEach((order) => {
      const orderDate = new Date(order.placed_at); // Parse the order date
      const orderDayIndex = (orderDate.getDay() + 6) % 7; // Adjust to start week from Monday

      // Only add sales if the order day is <= current day index
      if (orderDayIndex <= currentDayIndex) {
        salesByDay[orderDayIndex] += order.total; // Add order total to the respective day
      }
    });

    setDailySales(salesByDay); // Update state with calculated daily sales
  };

  // Fetch orders and categorize them on initial load and update
  useEffect(() => {
    fetchVendorOrders(); // Fetch vendor orders
  }, [fetchVendorOrders]);

  useEffect(() => {
    if (orders.length > 0) {
      categorizeSalesByDay(orders); // Categorize sales by day when orders change
    }

    // Update current day index on day change
    const intervalId = setInterval(() => {
      setCurrentDayIndex(getCurrentDayIndex());
    }, 60000); // Check every minute to see if the day has changed

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [orders]);

  // Handle bar click to navigate if sales > 0
  const handleBarClick = (dayIndex) => {
    if (dailySales[dayIndex] > 0) {
      // Navigate only if there are sales for that day
      navigate('/vendorsales', { state: { day: dayIndex } });
    }
  };

  const data = {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'], // Labels for days of the week
    datasets: [
      {
        label: 'Daily Sales',
        data: dailySales, // Use calculated daily sales
        borderColor: '#0A0E23', // Dark blue for line border
        backgroundColor: 'rgba(244, 125, 49, 0.5)', // Orange fill with opacity
        borderWidth: 4, // Thicker line border for better visibility
        pointBackgroundColor: (context) => {
          return context.dataIndex === currentDayIndex ? '#F47D31' : '#FFFFFF'; // Highlight current day
        },
        pointBorderColor: '#0A0E23',
        pointBorderWidth: 2,
        pointRadius: 6,
        fill: true,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to fit within the box
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#0A0E23', // Dark blue for legend labels
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `Rs ${context.raw.toFixed(2)}`, // Display sales with Rs sign
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 20000, // Maximum Y-axis value
        ticks: {
          stepSize: 5000, // Y-axis increments by 5000
          callback: (value) => `Rs ${value}`, // Add Rs sign to y-axis labels
          color: '#0A0E23', // Dark blue for y-axis labels
        },
        grid: {
          color: '#A9A9A9', // Lighter grid lines for y-axis
        },
      },
      x: {
        ticks: {
          color: '#0A0E23', // Dark blue for x-axis labels
          font: {
            size: 12, // Adjust font size if needed
          },
        },
        grid: {
          color: '#D3D3D3', // Slightly darker grid lines for x-axis
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        handleBarClick(index); // Trigger navigation on click
      }
    },
  };

  return (
    <Box height="150px"> {/* Chart height remains fixed */}
      <Line data={data} options={options} />
    </Box>
  );
};

export default DailySalesLineChart;
