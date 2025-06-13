// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import {
  VStack,
  Heading,
  Button,
  Image,
  Stack,
  Flex,
  Input,
  Box,
  Text,
} from "@chakra-ui/react";
import cutecat from '@/assets/cutecat.webp';
import { loginUser } from '@/services/authService';
import { toaster } from '@/components/ui/toaster';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate()

  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect") || "/";
  const state = JSON.stringify({ redirect });

  const handleLogin = async (email, password) => {
    try {
      const result = await loginUser(email, password);
  
      if (result.success) {
        console.log("Login successful:", result.user);
        navigate('/admin/dashboard')
  
        // Optional: store user in global state
        //setUser(result.user); // ← if using Zustand or context
      } else {
        console.error("Login failed:", result.message);
        toaster.error({ title: "Login failed", description: result.message, status: "error" });
      }
  
    } catch (err) {
      console.error("Something went wrong during login:", err);
      toaster.error({ title: "Error", description: "Unable to login. Try again.", status: "error" });
    }
  };
  


  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        boxShadow="lg"
        borderRadius="md"
        bg="white"
        overflow="hidden"
        width={{ base: '90%', md: '800px' }}
      >
        {/* Left: Login Form */}
        <Box flex="1" p={8}>
          <Heading fontSize="2xl" mb={6}>Sign in to your account</Heading>

          <VStack spacing={4} align="stretch">
            <Box>
              <Text mb={1}>Username</Text>
              <Input
                placeholder="Enter your username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            <Box>
              <Text mb={1}>Password</Text>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>

            <Button colorScheme="blue" onClick={() => handleLogin(email, password)} width="100%">
              Login
            </Button>

            {/* Google Sign-In */}
            <Box textAlign="center" mt={2}>
              <a href={`http://localhost:3000/auth/google?state=${encodeURIComponent(state)}`}>
                <Image
                  src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png"
                  alt="Sign in with Google"
                  mx="auto"
                  mt={2}
                />
              </a>
            </Box>
          </VStack>
        </Box>

        {/* Right: Cute Cat Image */}
        <Box flex="1" display="flex" alignItems="center" justifyContent="center" bg="gray.100">
          <Image src={cutecat} alt="Cute Cat" objectFit="cover" maxH="100%" maxW="100%" />
        </Box>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
