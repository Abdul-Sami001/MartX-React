import React, { useEffect, useState } from 'react';
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Spinner,
    Textarea,
    useToast,
    Center,
    Image,
    IconButton,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons'; // Import the back icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import useUserStore from '../stores/userStore';

const Profile = () => {
    const [editMode, setEditMode] = useState(false);
    const { user, loading, fetchUser, updateUser } = useUserStore();
    const [userData, setUserData] = useState({});
    const toast = useToast();
    const navigate = useNavigate(); // Initialize navigate

    const token = localStorage.getItem('access_token');

    useEffect(() => {
        if (!user) {
            fetchUser(token);
        } else {
            setUserData(user);
        }
    }, [user, fetchUser, token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSaveChanges = async () => {
        const success = await updateUser(token, userData);
        if (success) {
            setEditMode(false);
            toast({
                title: 'Profile updated.',
                description: 'Your profile information has been successfully updated.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Update failed.',
                description: 'There was an error updating your profile. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (loading) {
        return <Spinner size="xl" />;
    }

    return (
        <Box maxW="600px" mx="auto" p="6" boxShadow="md" borderRadius="md" bg="white" position="relative">
            {/* Back Button */}
            <IconButton
                icon={<ArrowBackIcon />}
                position="absolute"
                top="20px" // Adjusted spacing from top
                left="20px" // Adjusted spacing from left
                color="#0A0E27" // Blue color for the icon
                onClick={() => navigate('/dashboard')} // Navigate to the dashboard
                aria-label="Go back to Dashboard"
                borderColor="#0A0E27"
            />

            <Center mb="6">
                <Image src="/martxSlogan.png" alt="Logo" height="70px" /> {/* Logo at the top */}
            </Center>
            <Heading as="h2" size="lg" textAlign="center" mb="6" color="#0A0E27">
                User Profile
            </Heading>
            <FormControl mb="4">
                <FormLabel color="#0A0E27">First Name</FormLabel>
                <Input
                    type="text"
                    name="first_name"
                    value={userData.first_name || ''}
                    onChange={handleInputChange}
                    isReadOnly={!editMode}
                    borderColor="#0A0E27" // Matching color scheme
                />
            </FormControl>
            <FormControl mb="4">
                <FormLabel color="#0A0E27">Last Name</FormLabel>
                <Input
                    type="text"
                    name="last_name"
                    value={userData.last_name || ''}
                    onChange={handleInputChange}
                    isReadOnly={!editMode}
                    borderColor="#0A0E27" // Matching color scheme
                />
            </FormControl>
            <FormControl mb="4">
                <FormLabel color="#0A0E27">Email</FormLabel>
                <Input type="email" value={userData.email || ''} isReadOnly borderColor="#0A0E27" />
            </FormControl>
            <FormControl mb="4">
                <FormLabel color="#0A0E27">Phone Number</FormLabel>
                <Input
                    type="text"
                    name="phone_number"
                    value={userData.phone_number || ''}
                    onChange={handleInputChange}
                    isReadOnly={!editMode}
                    borderColor="#0A0E27" // Matching color scheme
                />
            </FormControl>
            <FormControl mb="4">
                <FormLabel color="#0A0E27">Address</FormLabel>
                <Textarea
                    name="address"
                    value={userData.address || ''}
                    onChange={handleInputChange}
                    isReadOnly={!editMode}
                    borderColor="#0A0E27" // Matching color scheme
                />
            </FormControl>
            <Box textAlign="center" mt="6">
                {editMode ? (
                    <>
                        <Button
                            bgGradient="linear(to-b, #303064, #0A0E27)"
                            color="white"
                            mr="4"
                            onClick={handleSaveChanges}
                        >
                            Save Changes
                        </Button>
                        <Button onClick={() => setEditMode(false)} color="#F47D31">
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Button
                        bgGradient="linear(to-b, #303064, #0A0E27)"
                        color="white"
                        onClick={() => setEditMode(true)}
                    >
                        Edit Profile
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default Profile;
