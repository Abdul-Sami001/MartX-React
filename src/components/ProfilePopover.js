import React, { useEffect } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Button,
  Avatar,
  Text,
  VStack,
  IconButton,
  useColorModeValue,
  useToast,
  HStack,
  Box,
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi'; // Import the logout icon
import { useNavigate } from 'react-router-dom';
import useUserStore from '../stores/userStore'; // Import the user store
import useAuthStore from '../stores/authStore'; // Import the auth store

const ProfilePopover = ({ isOpen, onClose, profileButtonRef }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { user, fetchUser } = useUserStore(); // Get user info and fetch function
  const logout = useAuthStore((state) => state.logout); // Zustand logout function

  // Fetch user data when the popover opens
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (isOpen && accessToken) {
      fetchUser(accessToken);
    }
  }, [isOpen, fetchUser]);

  const handleLogout = () => {
    // Clear authentication state
    logout();

    // Clear accessToken from localStorage
    localStorage.removeItem('accessToken');

    // Show a toast notification
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Redirect to auth page
    navigate('/auth');
  };

  return (
    <Popover
      placement="bottom"
      isOpen={isOpen}
      onClose={onClose}
      closeOnBlur={true}
    >
      <PopoverTrigger>
        <Button ref={profileButtonRef} variant="ghost">
          <Avatar size="sm" name={user?.first_name || 'User'} src={user?.Avatarvatar} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        bg={useColorModeValue('white', 'gray.800')}
        width="250px"
      >
        <PopoverArrow />

        {/* Top section with header and logout icon */}
        <Box position="relative" p={3}>
          <PopoverHeader color={useColorModeValue('#0A0E27', 'white')}>Profile</PopoverHeader>
          <PopoverCloseButton />
          <IconButton
            aria-label="Logout"
            icon={<FiLogOut />} // Logout icon
            onClick={handleLogout}
            variant="outline"
            colorScheme="red"
            size="sm"
            position="absolute"
            top="10px"
            right="40px" // Adjusted to prevent overlap with close button
          />
        </Box>

        <PopoverBody>
          {/* User Info */}
          <VStack spacing={4} textAlign="center">
            <Avatar size="xl" name={user?.first_name || 'User'} src={user?.avatar} mb={4} />
            <Text fontSize="xl" fontWeight="bold" color={useColorModeValue('#0A0E27', 'white')}>
              {user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}`: 'User'}
            </Text>
            <Text fontSize="md" color="gray.500">
              {user?.email}
            </Text>
          </VStack>
        </PopoverBody>

        <Button
          bg="#0A0E27"
          color="white"
          _hover={{ bg: '#0A0E27' }}
          onClick={() => {
            navigate('/profile');
            onClose();
          }}
          width="120px" // Minimized the button width
          mx="auto" // Centered the button
          mt={2}
          mb={4} // Added spacing below the button
          borderRadius="md" // Good-looking rounded corners
        >
          Edit Profile
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePopover;