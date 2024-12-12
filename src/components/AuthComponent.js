import React, { useState, useEffect } from 'react';
import {
  Box, Button, Flex, Text, Heading, VStack, IconButton, useColorModeValue
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../stores/userStore'; 
import ProfilePreview from './ProfilePopover';

const AuthComponent = ({ onLoginSubmit, onSignupSubmit, error }) => {
  const [isLogin, setIsLogin] = useState(true); 
  const [loading, setLoading] = useState(true);
  const bgColor = useColorModeValue('white', 'gray.800');
  const messageBg = '#0A0E27'; 
  const { user, fetchUser } = useUserStore();
  const navigate = useNavigate();
  const animationDuration = 0.7;
  const Dblue = '#0A0E27'; 

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUser(token);
    }
    setLoading(false);
  }, [fetchUser]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (user) {
    return <ProfilePreview user={user} />;
  }

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      bg={bgColor}
      position="relative"
      overflow="hidden"
    >
      {/* Form Side - Sliding from left to right */}
      <Box
        position="absolute"
        top={0}
        bottom={0}
        left={isLogin ? '0' : '50%'}
        right={isLogin ? '50%' : '0'}
        bg={bgColor}
        zIndex={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition={`all ${animationDuration}s ease`}
      >
        {/* Login Form */}
        <Box
          w="50%"
          p={8}
          borderRadius={8}
          display={isLogin ? 'block' : 'none'}
        >
          <LoginForm onSubmit={onLoginSubmit} error={error} />
        </Box>

        {/* Signup Form */}
        <Box
          w="50%"
          p={8}
          borderRadius={8}
          display={!isLogin ? 'block' : 'none'}
        >
          <SignupForm onSubmit={onSignupSubmit} error={error} />
        </Box>
      </Box>

      {/* Message Side - Sliding from right to left */}
      <Box
        position="absolute"
        top={0}
        bottom={0}
        left={isLogin ? '50%' : '0'}
        right={isLogin ? '0' : '50%'}
        bg={messageBg}
        zIndex={1}
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition={`all ${animationDuration}s ease`}
      >
        <VStack spacing={4} textAlign="center">
          <Heading mb={4} fontSize="3xl">
            {isLogin ? 'Hello, New User!' : 'Welcome Back!'}
          </Heading>
          <Text fontSize="lg">
            {isLogin
              ? "Don't have an account? Click below to sign up!"
              : 'Already have an account? Log in now!'}
          </Text>
          <Button
            size="lg"
            variant="outline"
            borderColor="#F47D31"
            color="#F47D31"
            borderRadius="full"
            onClick={() => setIsLogin(!isLogin)}
            _hover={{ bg: '#F47D31', color: 'white' }}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </Button>
        </VStack>
      </Box>

      {/* Back Button */}
     
      <IconButton
    icon={<ArrowBackIcon />}
    position="absolute"
    top="20px" // Adjusted spacing from top
    left="20px" // Adjusted spacing from left
    backgroundColor={isLogin ? '#0A0E27' : '#F47D31'} // Background color based on current screen
    onClick={() => navigate('/dashboard')} // Navigate back to a previous page or home
    color="white" // Text color remains white
    zIndex={2} // Ensure it stays on top of the sliding elements
/>

    </Flex>
  );
};

export default AuthComponent;
