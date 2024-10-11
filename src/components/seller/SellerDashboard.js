import React, { useState } from 'react';
import { Box, SimpleGrid, Text, Heading, Flex, Input, Button, Avatar, Icon, Grid, GridItem } from '@chakra-ui/react';
import { FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import MonthlyStatsBarChart from './MonthlyStatsBarChart';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import Ordersdetails from './Ordersdetails';  // Corrected import
import DailySalesLineChart from './DailySalesLineChart';
import Sidebar from './Sidebar';
import ProductPieChart from './ProductPieChart';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // const pieData = {
  //   labels: ['Product A', 'Product B', 'Product C', 'Product D'],
  //   datasets: [
  //     {
  //       label: 'Product Remaining',
  //       data: [15, 30, 45, 10],
  //       backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66CDAA'],
  //       borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66CDAA'],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  const handleOrdersClick = () => {
    setShowOrderDetails(true);
  };

  const handleBackToDashboard = () => {
    setShowOrderDetails(false);
  };

  return (
    <Box p="20px" flex="1" bg="#0A0E23" color="white" minHeight="100vh" border="1px solid #E2E8F0">
      {showOrderDetails ? (
        <>
          <Button onClick={handleBackToDashboard} colorScheme="blue" mb="4">
            Back to Dashboard
          </Button>
          <Ordersdetails /> {/* Corrected component name */}
        </>
      ) : (
        <>
        
          <Flex justify="space-between" align="center" mb="20px">
            <Input placeholder="Search" width="250px" bg="white" color="black" />
            <Button colorScheme="#0A0E23" _hover={{ bg: '#F47D31' }}>Switch to Buyer</Button>
          </Flex>

          <SimpleGrid columns={2} width="550px" spacing={0} mb="20px">
            <Box
              bg="white"
              p="15px"
              borderRadius="md"
              boxShadow="md"
              textAlign="center"
              borderWidth="1px"
              borderColor="gray.200"
              width="250px"
              height="150px"
            >
              <Icon as={FaDollarSign} w={6} h={6} color="#F47D31" mb="2" />
              <Heading size="lg" mb="2" color="#0A0E23">Total Sales</Heading>
              <Text fontSize="l" color="#F47D31">$25,300</Text>
            </Box>
            <Box
              bg="white"
              p="15px"
              borderRadius="md"
              boxShadow="md"
              textAlign="center"
              borderWidth="1px"
              borderColor="gray.200"
              width="250px"
              height="150px"
              cursor="pointer"
              onClick={handleOrdersClick}
            >
              <Icon as={FaShoppingCart} w={6} h={6} color="#F47D31" mb="2" />
              <Heading size="lg" mb="2" color="#0A0E23">Orders</Heading>
              <Text fontSize="xl" color="#F47D31">152</Text>
            </Box>
          </SimpleGrid>

          {/* Profile Box */}
          <Box
            bg="white"
            p="20px"
            borderRadius="md"
            boxShadow="md"
            borderWidth="1px"
            borderColor="gray.200"
            position="absolute"
            right="20px"
            top="80px"
            width="300px"
          >
            <Heading size="md" mb="4" color="#0A0E23">Profile</Heading>
            <Flex align="center">
              <Avatar name="John Doe" src="/path/to/profile-pic.jpg" size="xl" mr="4" />
              <Box>
                <Heading size="sm" color="#0A0E23">John Doe</Heading>
                <Text color="gray.600">Business Owner</Text>
                <Button bg="#0A0E23" color="white" _hover={{ bg: '#F47D31' }}>Edit Profile</Button>
              </Box>
            </Flex>
            <Box mt="4">
              <Text color="gray.600">Business Details:</Text>
              <Text color="gray.800">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula ex eu justo interdum, nec sollicitudin orci tincidunt.</Text>
            </Box>
          </Box>

          {/* Daily Sales Line Chart */}
          <Box height="150px" width="650px" mb="30px">
            <DailySalesLineChart />
          </Box>

          <Grid templateColumns="2fr 1fr" gap="6">
            <GridItem>
              <Box mt="-20px" width="650px" bg="white" p="20px" borderRadius="md" boxShadow="md">
                <Heading size="md" mb="2" color="#0A0E23">Overview Order</Heading>
                <Box height="300px" width="600px" borderRadius="md">
                  <MonthlyStatsBarChart />
                </Box>
              </Box>
            </GridItem>
            <GridItem>
              <Box width="300px" bg="white" p="20px" borderRadius="md" boxShadow="md">
                <Heading size="md" mb="4" color="#0A0E23">Product Breakdown</Heading>
                {/* <Box height="300px" width="100%" borderRadius="md">
                  <Pie
                    data={pieData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: 'top' },
                        tooltip: {
                          callbacks: {
                            label: (context) => `${context.label}: ${context.raw}%`,
                          },
                        },
                      },
                    }}
                  />
                </Box> */}
                <Box mb="20px">
        <ProductPieChart />
      </Box>
              </Box>
            </GridItem>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
