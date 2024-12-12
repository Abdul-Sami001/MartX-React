import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Text, Heading, Flex, Button, Icon, Grid, GridItem } from '@chakra-ui/react';
import { FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import MonthlyStatsBarChart from './MonthlyStatsBarChart';
import Ordersdetails from './VendorOrders'; // Corrected import
import DailySalesLineChart from './DailySalesLineChart';
import ProductPieChart from './ProductPieChart';
import { useNavigate } from 'react-router-dom';
import useVendorOrderStore from '../../stores/vendorOrderStore'; // Import store for total sales

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { orders, fetchVendorOrders } = useVendorOrderStore(); // Get orders from the store
  const [totalSales, setTotalSales] = useState(0); // State to store total sales

  useEffect(() => {
    if (orders.length === 0) {
      fetchVendorOrders(); // Fetch orders if not already fetched
    } else {
      calculateTotalSales(orders); // Calculate total sales
    }
  }, [orders, fetchVendorOrders]);

  const calculateTotalSales = (orders) => {
    let total = 0;
    orders.forEach((order) => {
      total += order.total || 0; // Summing up order totals
    });
    setTotalSales(total);
  };

  const handleSwitchToBuyer = () => {
    navigate('/dashboard');
  };

  const handleOrdersClick = () => {
    navigate('/vendor-orders');
  };

  return (
    <Box p="20px" flex="1" bg="#0A0E23" color="white" height="97vh" border="1px solid #E2E8F0">
      <Flex justify="flex-start" align="center" mb="20px">
        <Button colorScheme='#F47D31' _hover={{ bg: '#F47D31' }} onClick={handleSwitchToBuyer}>
          Switch to Buyer
        </Button>
      </Flex>

      {/* Total Sales and Orders Boxes with Line Chart */}
      <SimpleGrid columns={3} spacing="20px" mb="20px">
        {/* Updated Total Sales Box */}
        <Box
          bg="white"
          p="15px"
          borderRadius="md"
          boxShadow="md"
          textAlign="center"
          borderWidth="1px"
          borderColor="gray.200"
          width="100%"
          height="150px"
          cursor="pointer"
          onClick={() => navigate('/vendorsales')} // Navigate to /vendorsales
        >
          <Icon as={FaDollarSign} w={6} h={6} color="#F47D31" mb="2" />
          <Heading size="lg" mb="2" color="#0A0E23">Total Sales</Heading>
          <Text fontSize="l" color="#F47D31">Rs {totalSales.toFixed(2)}</Text>
        </Box>

        <Box
          bg="white"
          p="15px"
          borderRadius="md"
          boxShadow="md"
          textAlign="center"
          borderWidth="1px"
          borderColor="gray.200"
          width="100%"
          height="150px"
          cursor="pointer"
          onClick={handleOrdersClick}
        >
          <Icon as={FaShoppingCart} w={6} h={6} color="#F47D31" mb="2" />
          <Heading size="lg" mb="2" color="#0A0E23">Orders</Heading>
          <Text fontSize="xl" color="#F47D31">152</Text>
        </Box>

        <Box
          bg="white"
          p="15px"
          borderRadius="md"
          boxShadow="md"
          borderWidth="1px"
          borderColor="gray.200"
          width="100%"
          height="150px"
        >
          <DailySalesLineChart />
        </Box>
      </SimpleGrid>

      {/* Charts Section */}
      <Grid templateColumns="2fr 1fr" gap="6">
        <GridItem>
          <Box width="690px" bg="white" p="20px" borderRadius="md" boxShadow="md">
            <Heading size="md" mb="2" color="#0A0E23">Overview Order</Heading>
            <Box height="300px" width="600px" borderRadius="md">
              <MonthlyStatsBarChart />
            </Box>
          </Box>
        </GridItem>

        <GridItem>
          <Box width="325px" height="370px" bg="white" p="20px" borderRadius="md" boxShadow="md">
            <Heading size="md" mb="4" color="#0A0E23">Product Breakdown</Heading>
            <Box mb="20px">
              <ProductPieChart />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default SellerDashboard;
