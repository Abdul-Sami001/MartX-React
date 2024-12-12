import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
    Box,Center, Button,Image, FormControl, Input, InputGroup, InputRightElement, Heading, FormErrorMessage, useColorModeValue
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const SignupForm = ({ onSubmit, error }) => {
    const bgColor = useColorModeValue('white', 'gray.700');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickPassword = () => setShowPassword(!showPassword);
    const handleClickConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <Formik
            initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
            validate={values => {
                const errors = {};
                if (!values.username) errors.username = 'Username is required';
                if (!values.email) errors.email = 'Email is required';
                if (!values.password) errors.password = 'Password is required';
                if (values.password !== values.confirmPassword) errors.confirmPassword = 'Passwords must match';
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                await onSubmit(values);
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Box
                        p={8}
                        maxWidth="400px"
                       // borderWidth={1}
                        borderRadius={8}
                       // boxShadow="lg"
                        bg={bgColor}
                        m="auto"
                        mt={10}
                    >
                        <Center mb={6}>
             <Box display="flex" alignItems="center" mb={{ base: 2, md: 0 }} >
                    <Image src="/martxSlogan.png" alt="Logo" height="70px" />
                </Box>
            </Center>
                        <Heading as="h2" textAlign="center" mb={6} color="#0A0E27">
                            Sign Up
                        </Heading>

                        <FormControl id="username" isInvalid={!!(error && error.username)} mb={4}>
                            <Field
                                as={Input}
                                name="username"
                                placeholder="Enter Username"
                                variant="flushed"
                                focusBorderColor="#0A0E27"
                            />
                            <FormErrorMessage>
                                <ErrorMessage name="username" />
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl id="email" isInvalid={!!(error && error.email)} mb={4}>
                            <Field
                                as={Input}
                                name="email"
                                type="email"
                                placeholder="Enter Email"
                                variant="flushed"
                                focusBorderColor="#0A0E27"
                            />
                            <FormErrorMessage>
                                <ErrorMessage name="email" />
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl id="password" isInvalid={!!(error && error.password)} mb={4}>
                            <InputGroup>
                                <Field
                                    as={Input}
                                    pr="4.5rem"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter Password"
                                    variant="flushed"
                                    focusBorderColor="#0A0E27"
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClickPassword}>
                                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>
                                <ErrorMessage name="password" />
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl id="confirmPassword" isInvalid={!!(error && error.confirmPassword)} mb={4}>
                            <InputGroup>
                                <Field
                                    as={Input}
                                    pr="4.5rem"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirm Password"
                                    variant="flushed"
                                    focusBorderColor="#0A0E27"
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClickConfirmPassword}>
                                        {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>
                                <ErrorMessage name="confirmPassword" />
                            </FormErrorMessage>
                        </FormControl>

                        {error && <p>{error}</p>}
                        <center>
                        <Button
                            mt={6}
                            bgGradient="linear(to-b, #303064, #0A0E27)" // Gradient from light at the top to dark at the bottom
                            color="white"
                            _hover={{
                              bgGradient: "linear(to-b, #112C50, #0A0E27)", // Slightly lighter gradient on hover
                            }}
                            isLoading={isSubmitting}
                            loadingText="Submitting"
                            type="submit"
                            width="50%"
                            borderRadius="md"
                            variant="solid"
                        >
                            Sign Up
                        </Button>
                        </center>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default SignupForm;
