import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, VStack, HStack, Divider, Badge, Stack, Spinner } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderConfirmation = () => {
    const { orderId } = useParams();  // Get the orderId from URL parameters
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated
        const token = localStorage.getItem('accessToken');

        // Fetch order details based on authentication status
        if (token) {
            fetchAuthenticatedOrderDetails(token);
        } else {
            fetchGuestOrderDetails();
        }
    }, [orderId]);

    // Fetch order details for authenticated users
    const fetchAuthenticatedOrderDetails = async (token) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/store/orders/${orderId}/`, {
                headers: { Authorization: `JWT ${token}` }
            });
            setOrderDetails(response.data);
        } catch (error) {
            console.error('Failed to fetch authenticated order details:', error);
            navigate('/dashboard');  // Redirect to dashboard if fetching fails
        } finally {
            setLoading(false);
        }
    };

    // Fetch order details for guest users
    const fetchGuestOrderDetails = async () => {
        try {
            const guestEmail = localStorage.getItem('guestEmail');  // Assuming guest email is stored locally
            const response = await axios.post('http://127.0.0.1:8000/store/guest-orders/', {
                order_id: orderId,
                email: guestEmail
            });
            setOrderDetails(response.data);
        } catch (error) {
            console.error('Failed to fetch guest order details:', error);
            navigate('/dashboard');  // Redirect to dashboard if fetching fails
        } finally {
            setLoading(false);
        }
    };

    // Determine the badge color based on payment status
    const getStatusBadgeColor = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'green';
            case 'pending':
                return 'orange';
            case 'failed':
                return 'red';
            default:
                return 'gray';
        }
    };

    if (loading) {
        return (
            <VStack mt={10}>
                <Spinner size="xl" />
                <Text mt={4}>Loading order details...</Text>
            </VStack>
        );  // Show loading spinner
    }

    if (!orderDetails) {
        return (
            <VStack mt={10}>
                <Text fontSize="lg" color="red.500">Order details not available.</Text>
                <Button colorScheme="blue" mt={4} onClick={() => navigate('/dashboard')}>
                    Back to Dashboard
                </Button>
            </VStack>
        );  // Show error state if orderDetails is null
    }

    return (
        <Box maxW="700px" mx="auto" p={6} borderWidth={1} borderRadius="md" boxShadow="lg" mt={10}>
            <Heading size="lg" textAlign="center" mb={6}>
                Order Confirmation
            </Heading>

            {/* Order ID and Payment Status */}
            <VStack align="start" spacing={3} mb={6}>
                <HStack>
                    <Text fontWeight="bold">Order ID:</Text>
                    <Text>{orderDetails.id}</Text>
                </HStack>
                <HStack>
                    <Text fontWeight="bold">Payment Status:</Text>
                    <Badge colorScheme={getStatusBadgeColor(orderDetails.payment_status)}>
                        {orderDetails.payment_status}
                    </Badge>
                </HStack>
                <HStack>
                    <Text fontWeight="bold">Total Amount:</Text>
                    <Text fontSize="xl" fontWeight="bold" color="teal.500">
                        Rs {orderDetails.total.toFixed(2)}
                    </Text>
                </HStack>
            </VStack>

            <Divider mb={4} />

            {/* Order Items Section */}
            <Box>
                <Heading size="md" mb={4}>
                    Order Items
                </Heading>
                <Stack spacing={4}>
                    {orderDetails.items.map((item, index) => (
                        <Box
                            key={index}
                            p={4}
                            borderWidth={1}
                            borderRadius="md"
                            boxShadow="sm"
                            _hover={{ boxShadow: 'md', bg: 'gray.50' }}
                        >
                            <HStack justifyContent="space-between">
                                <Text fontWeight="bold">{item.product.title}</Text>
                                <Text color="gray.500">
                                    {item.quantity} x Rs {item.unit_price.toFixed(2)}
                                </Text>
                            </HStack>
                            <HStack justifyContent="space-between" mt={2}>
                                <Text fontWeight="bold">Subtotal:</Text>
                                <Text color="teal.600" fontWeight="bold">
                                    Rs {(item.quantity * item.unit_price).toFixed(2)}
                                </Text>
                            </HStack>
                        </Box>
                    ))}
                </Stack>
            </Box>

            <Divider my={6} />

            {/* Back to Dashboard Button */}
            <Button
                colorScheme="blue"
                mt={6}
                width="full"
                size="lg"
                onClick={() => navigate('/dashboard')}
            >
                Back to Dashboard
            </Button>
        </Box>
    );
};

export default OrderConfirmation;
