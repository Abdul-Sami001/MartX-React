import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    Textarea,
    useToast,
    VStack,
    Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SellerSignup = () => {
    const userId = localStorage.getItem("vendorId"); // Get the user ID from local storage
    const [sellerData, setSellerData] = useState({
        user: userId, // Include the user ID here
        name: '',
        email: '',
        phone: '',
        shop_name: '',
        shop_description: '',
        shop_address: '',
    });

    const toast = useToast();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSellerData({
            ...sellerData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send POST request to backend API
            await axios.post('http://127.0.0.1:8000/store/vendors/', sellerData);

            // Display success toast and navigate to dashboard
            toast({
                title: `Dear ${sellerData.name},`,
                description: "Your information is sent to admin. You will receive an email confirmation, and after that, you can log in to your seller account.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            // Navigate to /dashboard after successful registration
            navigate('/dashboard');
        } catch (error) {
            console.error("Error during signup", error);

            // Check if the response contains data with the error message
            const errorMessage = error.response?.data?.error || "There was an error registering your seller account. Please try again.";

            // Show the error message in the toast
            toast({
                title: "Registration Failed",
                description: errorMessage, // Display the error message from the response
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }

    };

    return (
        <Box
            maxW={{ base: "95%", md: "600px" }}
            mx="auto"
            p={6}
            boxShadow="lg"
            borderRadius="lg"
            bg="white"
            mt={8}
        >
            <VStack spacing={4} width="100%">
                {/* Logo */}
                <Image src="/martxSlogan.png" alt="Logo" width="250px" mb={4} />

                {/* Heading */}
                <Heading as="h1" size="lg" textAlign="center" mb={6} color="#0A0E27">
                    Seller Registration
                </Heading>

                {/* Form Fields */}
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <FormControl id="name" isRequired mb={4}>
                        <FormLabel>Name</FormLabel>
                        <Input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={sellerData.name}
                            onChange={handleInputChange}
                            width="70%"
                            mx="auto"
                            display="block"
                            fontSize="lg"
                            height="50px"
                        />
                    </FormControl>
                    <FormControl id="email" isRequired mb={4}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={sellerData.email}
                            onChange={handleInputChange}
                            width="70%"
                            mx="auto"
                            display="block"
                            fontSize="lg"
                            height="50px"
                        />
                    </FormControl>
                    <FormControl id="phone" isRequired mb={4}>
                        <FormLabel>Phone</FormLabel>
                        <Input
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={sellerData.phone}
                            onChange={handleInputChange}
                            width="70%"
                            mx="auto"
                            display="block"
                            fontSize="lg"
                            height="50px"
                        />
                    </FormControl>
                    <FormControl id="shop_name" isRequired mb={4}>
                        <FormLabel>Shop Name</FormLabel>
                        <Input
                            type="text"
                            name="shop_name"
                            placeholder="Enter your shop name"
                            value={sellerData.shop_name}
                            onChange={handleInputChange}
                            width="70%"
                            mx="auto"
                            display="block"
                            fontSize="lg"
                            height="50px"
                        />
                    </FormControl>
                    <FormControl id="shop_description" mb={4}>
                        <FormLabel>Shop Description</FormLabel>
                        <Textarea
                            name="shop_description"
                            placeholder="Describe your shop"
                            value={sellerData.shop_description}
                            onChange={handleInputChange}
                            width="70%"
                            mx="auto"
                            display="block"
                            fontSize="lg"
                            height="100px"
                        />
                    </FormControl>
                    <FormControl id="shop_address" mb={4}>
                        <FormLabel>Shop Address</FormLabel>
                        <Textarea
                            name="shop_address"
                            placeholder="Enter your shop address"
                            value={sellerData.shop_address}
                            onChange={handleInputChange}
                            width="70%"
                            mx="auto"
                            display="block"
                            fontSize="lg"
                            height="100px"
                        />
                    </FormControl>

                    {/* Register Button */}
                    <Button
                        type="submit"
                        bg="#0A0E27"
                        color="white"
                        width="40%"
                        mx="auto"
                        mt={4}
                        display="block"
                        _hover={{ bg: "#0A0E27" }}
                    >
                        Register
                    </Button>
                </form>
            </VStack>
        </Box>
    );
};

export default SellerSignup;
