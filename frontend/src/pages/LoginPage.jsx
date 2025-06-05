// src/pages/LoginPage.jsx
import React from 'react';
import { useLocation } from "react-router-dom";
import {
  VStack,
  Heading,
  Text,
  Image
} from "@chakra-ui/react";

const LoginPage = () => {
  const location = useLocation();

  // Read `redirect` from ?redirect=/user/setting
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect") || "/";
  const state = JSON.stringify({ redirect });


  return (
    <VStack spacing={6} mt={10}>
      <Heading size="lg">Sign in to continue</Heading>
      <Text>You’ll be redirected to: <strong>{redirect}</strong></Text>
      <a href={`http://localhost:3000/auth/google?state=${encodeURIComponent(state)}`}>
        <Image
          src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png"
          alt="Sign in with Google"
        />
      </a>
    </VStack>
  );
};

export default LoginPage;
