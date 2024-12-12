import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Spinner,
  List,
  ListItem,
  VStack,
  HStack,
  Badge,
  Flex,
  Button,
} from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import useVendorOrderStore from '../../stores/vendorOrderStore';

const VendorSales = () => {
  const { orders = [], loading, error, fetchVendorOrders } = useVendorOrderStore();
  const [totalSales, setTotalSales] = useState(0);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dayFilter = location.state?.day; // Get the day filter from route state

  // Calculate total sales
  const calculateSales = (orders) => {
    let total = 0;
    orders.forEach((order) => {
      total += order.total || 0;
    });
    setTotalSales(total);
  };

  // Correct filter function for orders by day
  const filterOrdersByDay = (orders, day) => {
    return orders.filter((order) => {
      const orderDate = new Date(order.placed_at);
      const orderDay = (orderDate.getDay() + 6) % 7; // Adjust week start from Monday
      return orderDay === day;
    });
  };

  useEffect(() => {
    if (orders.length === 0) {
      fetchVendorOrders(); // Fetch orders if not already fetched
    } else {
      if (dayFilter !== undefined) {
        // If navigated with a day filter, filter the orders
        const filtered = filterOrdersByDay(orders, dayFilter);
        setFilteredOrders(filtered);
        calculateSales(filtered);
      } else {
        // Otherwise, display all orders
        setFilteredOrders(orders);
        calculateSales(orders);
      }
    }
  }, [orders, fetchVendorOrders, dayFilter]);

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner color="#F47D31" size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Text color="red.500" textAlign="center" mt={8}>
        {error}
      </Text>
    );
  }

  return (
    <Box
      p={6}
      bg="white"
      color="gray.800"
      borderRadius="md"
      boxShadow="xl"
      maxW="600px"
      mx="auto"
      mt={8}
    >
      {/* Back Button */}
      <Button
        leftIcon={<FaArrowLeft />}
        colorScheme="blue"
        variant="outline"
        mb={4}
        onClick={() => navigate('/MainSellerPage')}
      >
        Back
      </Button>

      <VStack spacing={4} align="stretch">
        <Box textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            Total Sales
          </Text>
          <Text fontSize="4xl" fontWeight="bold" color="#0A0E27">
            Rs {totalSales.toFixed(2)}
          </Text>
        </Box>

        <Box mt={6} bg="white" p={4} borderRadius="md" boxShadow="md">
          <Text fontSize="xl" fontWeight="bold" color="#0A0E27" mb={4}>
            Sales List
          </Text>
          {filteredOrders.length === 0 ? (
            <Text textAlign="center" color="gray.500">
              {dayFilter !== undefined ? 'No sales for the selected day.' : 'No sales available at the moment.'}
            </Text>
          ) : (
            <List spacing={3}>
              {filteredOrders.map((order) => (
                <ListItem
                  key={order.id}
                  p={4}
                  bg="white"
                  borderRadius="md"
                  boxShadow="sm"
                  _hover={{ bg: 'gray.50' }}
                  border="1px solid"
                  borderColor="#0A0E27"
                >
                  <VStack align="start" spacing={1}>
                    <HStack justify="space-between" w="full">
                      <Text fontWeight="bold">Order ID: {order.id}</Text>
                      <Badge colorScheme="green" variant="solid">
                        {order.status || 'Completed'}
                      </Badge>
                    </HStack>
                    <Text fontSize="sm">
                      Date: {new Date(order.placed_at).toLocaleString()}
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" color="#0A0E27">
                      Rs {order.total?.toFixed(2) || '0.00'}
                    </Text>
                  </VStack>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default VendorSales;
