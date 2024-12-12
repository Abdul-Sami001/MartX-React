import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Text, VStack, Spinner, HStack, IconButton, Flex, Button } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import api from '../services/authInterceptor';  // Axios instance for authenticated requests

// Function to fetch order details
const fetchOrderDetails = async (orderId) => {
    const response = await api.get(`/store/orders/${orderId}/`);
    return response.data;
};

const OrderDetail = () => {
    const { orderId } = useParams();  // Get orderId from the URL params
    const navigate = useNavigate();

    const { data: order, status } = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => fetchOrderDetails(orderId),
    });

    // Navigate back to the vendor orders page
    const handleBackClick = () => {
        navigate('/vendor-orders');
    };

    // Function to download the order receipt as a PDF
    const downloadReceipt = () => {
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text(`Order Receipt - Order #${order.id}`, 20, 20);

        doc.setFontSize(12);
        doc.text(`Status: ${order.payment_status}`, 20, 40);
        doc.text(`Total: Rs ${order.total.toFixed(2)}`, 20, 50);

        doc.text('Items:', 20, 70);
        order.items.forEach((item, index) => {
            doc.text(`- ${item.product.title}`, 20, 80 + index * 10);
            doc.text(`  Quantity: ${item.quantity}`, 100, 80 + index * 10);
            doc.text(`  Unit Price: Rs ${item.unit_price.toFixed(2)}`, 140, 80 + index * 10);
        });

        doc.save(`Order_${order.id}_Receipt.pdf`);
    };

    // Loading state
    if (status === 'loading') {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner color="#F47D31" size="xl" />
            </Box>
        );
    }

    // Error state
    if (status === 'error') {
        return <Text color="red.500">Failed to load order details. Please try again.</Text>;
    }

    // Check if the order is defined and has necessary properties
    if (!order || !order.items || order.items.length === 0) {
        return <Text color="white">No order details available.</Text>;
    }

    return (
        <Box p={5} bg="#0A0E23" minHeight="100vh" color="white">
            <Flex align="center" mb={4}>
                <IconButton
                    icon={<FaArrowLeft />}
                    aria-label="Back"
                    onClick={handleBackClick}
                    colorScheme="orange"
                    variant="outline"
                    mr={2}
                />
                <Text fontSize="2xl" fontWeight="bold">Order #{order?.id}</Text>
            </Flex>

            <Text>Status: {order?.payment_status}</Text>
            <Text>Total: Rs {order?.total?.toFixed(2)}</Text>

            <Text fontSize="lg" fontWeight="bold" mt={5} mb={2}>Items:</Text>
            <VStack spacing={4} align="stretch">
                {order.items.map((item) => (
                    <Box key={item.id} p={4} borderWidth="1px" borderRadius="lg" borderColor="gray.600">
                        <HStack justifyContent="space-between">
                            <Text fontWeight="bold">{item?.product?.title}</Text>
                            <Text>Quantity: {item?.quantity}</Text>
                        </HStack>
                        <Text>Unit Price: Rs {item?.unit_price?.toFixed(2)}</Text>
                        <Text>Total: Rs {(item?.unit_price * item?.quantity).toFixed(2)}</Text>
                    </Box>
                ))}
            </VStack>

            {/* Download receipt button */}
            <Button
                mt={8}
                colorScheme="orange"
                onClick={downloadReceipt}
            >
                Download Receipt
            </Button>
        </Box>
    );
};

export default OrderDetail;
