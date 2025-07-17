import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";

import { useEffect } from "react";
import { fetchProduct } from "@/store/productActions";
import { useProductStore } from "@/store/useProductStore";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { addToCart } from "@/services/cartService";
import { toaster } from "@/components/ui/toaster";
import { useCartStore } from "@/store/useCartStore";

const ProductPage = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { currentProduct } = useProductStore();
  const { slug } = useParams();
  const { setCart } = useCartStore();
  const location = useLocation()
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchProduct(slug);
  }, [slug]);

  if (!currentProduct) {
    return (
      <Container>
        <Box>Product Not Found</Box>
      </Container>
    );
  }

  

  const handleAddToCart = async () => {
    if (!user) {
      const redirect = encodeURIComponent(location.pathname + location.search);
      navigate(`/login?redirect=${redirect}`);
      return;
    }    
    // user is logged in: proceed to add to cart
    try {
      const updatedCart = await addToCart(currentProduct);
      setCart(updatedCart)
      toaster.success({
        title: "Added 1 Item to Cart",
        description: "The product was successfully added"
      })
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong.";
      toaster.error({
        title: "Error",
        description: message
      })
    }
  };

  const handleBuyNow = async () => {
    if (!user) {
      const redirectAction = encodeURIComponent(
        JSON.stringify({
          type: "buyNow",
          product_id: currentProduct.id,
        })
      );
      window.location.href = `${BASE_URL}/auth/google?state=${redirectAction}`;
      return;
    }
    try {
      const updatedCart = await addToCart(currentProduct);
      setCart(updatedCart);
      navigate("/checkout");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Something went wrong.";
      toaster.error({
        title: "Error",
        description: message,
      });
    }
  };

  return (
    <Container maxW="7xl" py={10}>
      <Flex direction={{ base: "column", lg: "row" }} gap={10} opacity={currentProduct.deleted ? 0.4 : 1} pointerEvents={currentProduct.deleted ? "none" : "auto"}>
        {/* Left: Product Image */}
        <Box flex="1" maxW="400px">
  <Image
    src={currentProduct.image}
    alt={currentProduct.name}
    rounded="md"
    w="100%"
    h={{ base: "auto", lg: "350px" }}
    objectFit="contain"
    bg="gray.50"
  />
</Box>


        {/* Middle: Description and Info */}
        <Box flex="2">
          <Heading fontSize="2xl" mb={2}>{currentProduct.name}</Heading>
          <Text fontSize="lg" mb={4}>
            Stock: {currentProduct.stock}
          </Text>
          <Text mb={6}>
            {currentProduct.description || "No description available."}
          </Text>
          <Box>
            <Heading size="md" mb={2}>Product Details</Heading>
            <Text fontSize="sm" >• Feature 1</Text>
            <Text fontSize="sm" >• Feature 2</Text>
            <Text fontSize="sm" >• Feature 3</Text>
          </Box>
          {/* Optional: Add reviews section here later */}
        </Box>

        {/* Right: Buy Box */}
        <Box
          flex="1"
          borderWidth={1}
          borderRadius="lg"
          p={6}
          boxShadow="md"
          alignSelf="flex-start"
          position="sticky"
          top="1rem"
        >
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(currentProduct.price)}
          </Text>
          {currentProduct.deleted && (
  <Text mt={2} fontSize="sm" color="red.500" fontWeight="bolder">
    This product cannot be purchased.
  </Text>
)}

          <Button
            colorScheme="green"
            size="lg"
            width="100%"
            onClick={handleAddToCart}
            isDisabled={currentProduct.deleted}
          >
            Add to Cart
          </Button>
          <Button
            bg="green"
            size="lg"
            width="100%"
            onClick={handleBuyNow}
            isDisabled={currentProduct.deleted}
          >
            Buy Now
          </Button>
        </Box>
      </Flex>
    </Container>
  );
};

export default ProductPage;
