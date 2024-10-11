// src/components/Earnings.js
import React from 'react';
import { Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Grid, GridItem } from '@chakra-ui/react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Earnings = () => {
  // Mock data for the charts
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Earnings ($)',
        data: [5000, 4000, 6000, 7000, 5000, 8000],
        backgroundColor: '#F47D31',
        borderColor: '#0A0E23',
        borderWidth: 2,
        barThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.1,
      },
    ],
  };

  const pieData = {
    labels: ['Product A', 'Product B', 'Product C'],
    datasets: [
      {
        label: 'Profit',
        data: [30, 50, 20],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box display="flex" height="100vh" bg="#0A0E23" color="white" border="2px">
      {/* Sidebar height should match page height */}
      

      <Box flex="1" p="20px" overflowY="auto">
        <Heading mb="20px" color="#F47D31">Earnings Analytics</Heading>

        <SimpleGrid columns={2} spacing={10} mb="20px">
          <Stat>
            <StatLabel>Total Earnings</StatLabel>
            <StatNumber>$40,000</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              15% from last month
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Top Earning Category</StatLabel>
            <StatNumber>Product B</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              $20,000
            </StatHelpText>
          </Stat>
        </SimpleGrid>

        {/* Aligning Bar and Pie chart side by side */}
        <Grid templateColumns="repeat(2, 1fr)" gap={6} alignItems="center">
          {/* Bar Graph */}
          <GridItem height="300px">
            <Heading size="md" mb="4">Earnings by Month</Heading>
            <Bar data={barData} options={chartOptions} />
          </GridItem>

          {/* Pie Chart */}
          <GridItem height="300px">
            <Heading size="md" mb="4">Profit by Product</Heading>
            <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default Earnings;
