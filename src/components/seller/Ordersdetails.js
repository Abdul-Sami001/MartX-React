import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Checkbox, Text, Badge, IconButton, HStack, Input } from '@chakra-ui/react';
import { SearchIcon, DeleteIcon, SettingsIcon, DownloadIcon } from '@chakra-ui/icons';
import axios from 'axios';
import api from '../../services/authInterceptor'; // Assuming you're using an API interceptor

const getStatusBadge = (status) => {
  const statusColors = {
    Shipped: 'green',
    Pending: 'yellow',
    Partial: 'orange',
    No: 'red',
  };

  return <Badge colorScheme={statusColors[status]}>{status}</Badge>;
};

const OrderDetails = () => {
  const [orders, setOrders] = useState([]); // State to store orders
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    // Fetch orders from the backend
    const fetchOrders = async () => {
      try {
        const response = await api.get('/store/orders/');
        setOrders(response.data); // Update the orders with API response
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders(); // Fetch orders when the component mounts
  }, []);

  return (
    <Box backgroundColor="#0A0E23" color="white" p={5} borderRadius="lg" border={'2px'} height={'456px'}>
      <HStack justifyContent="space-between" mb={4}>
        <Input
          placeholder="Search"
          maxW="300px"
          backgroundColor="white"
          color="black"
          _placeholder={{ color: 'gray.400' }}
        />
        <HStack spacing={2}>
          <IconButton icon={<SearchIcon />} aria-label="Search" />
          <IconButton icon={<DeleteIcon />} aria-label="Delete selected" />
          <IconButton icon={<SettingsIcon />} aria-label="Filter" />
          <IconButton icon={<DownloadIcon />} aria-label="Download" />
        </HStack>
      </HStack>

      {loading ? (
        <Text>Loading...</Text> // Show loading text while fetching orders
      ) : (
        <Table variant="simple" colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th><Checkbox colorScheme="orange" /></Th>
              <Th>Number</Th>
              <Th>Date</Th>
              <Th>Customer</Th>
              <Th>Paid</Th>
              <Th>Status</Th>
              <Th>Items</Th>
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order, index) => (
              <Tr key={index}>
                <Td><Checkbox colorScheme="orange" /></Td>
                <Td>{order.number}</Td>
                <Td>{order.date}</Td>
                <Td>{order.customer}</Td>
                <Td>
                  <Text color={order.paid === 'Yes' ? 'green.400' : order.paid === 'Partial' ? 'orange.400' : 'red.400'}>
                    {order.paid}
                  </Text>
                </Td>
                <Td>{getStatusBadge(order.status)}</Td>
                <Td>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</Td>
                <Td>${order.total}.00</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default OrderDetails;
