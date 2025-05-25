import { Box, Button,  Container, Flex, Text, VStack } from "@chakra-ui/react"
import { useParams } from "react-router-dom";
import CartItem from "@/components/ui/CartItem";
import { useCartStore } from "@/store/useCartStore";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";

const CheckoutPage = () => {
  const { cart } = useCartStore()
  const {id} = useParams("id")

  const totalQuantity = cart.reduce((sum, item) => sum + item.cart_quantity, 0);

    const totalPrice = cart.reduce((sum, product) => {
      return sum + product.price * (product.cart_quantity || 1);
    }, 0);
  
  const handleBuyNow = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/order/checkout", {
        method: "POST",
        credentials: "include", // for session-based auth
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: currentProduct.id,
          quantity,
        }),
      });
  
      if (res.status === 401) {
        window.location.href = "http://localhost:3000/auth/google"; // or show modal
        return;
      }
  
      const data = await res.json();
  
      // Redirect to your local checkout page, passing the orderId
      navigate(`/checkout/${data.orderId}`);
    } catch (error) {
      console.error("Error processing purchase", error);
    }
  };

  return (
  <>
  <Box p={4}>
  <Link as={RouterLink} to="/" display="flex" alignItems="center" fontWeight="bold">
    SukaLupa
  </Link>
</Box>

  <Container p="100px">
      <Flex direction={{ base: "column", md: "row" }} gap={6}>
        {/* Left Side: Address + Cart */}
        <Flex direction="column" flex="2" gap={4}>
          <Box p={4} borderWidth={1} borderRadius="md">
            <Text fontWeight="bold" mb={2}>Shipping Address</Text>
            {/* Address info or input form */}
          </Box>
            
            <Box p={4} borderWidth={1} borderRadius="md">
              <Text fontWeight="bold" mb={2}>Cart Items</Text>
              <VStack flex="2" gap={4} align="stretch">
        {cart.length === 0 ? (
          <Text>Your cart is empty.</Text>
        ) : (
          cart.map((product) => (
          <CartItem key={product.id} item={product} />
        ))
        )}
</VStack>
            </Box>
        </Flex>
        
        {/* Right Side: Price Summary */}
        
        <Box flex="1" p={4} borderWidth={1} borderRadius="md" minW="250px">
          <Text fontWeight="bold" mb={2}>Order Summary</Text>
          <Flex justify="space-between">
            <Text>Subtotal</Text>
            <Text fontWeight="medium">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(totalPrice)}
          </Text>
          </Flex>
          <Flex justify="space-between">
            <Text>Tax</Text>
            <Text>Rp XXX</Text>
          </Flex>
          <Flex justify="space-between" mt={2} fontWeight="bold">
            <Text>Total</Text>
            <Text fontWeight="medium">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(totalPrice)}
          </Text>
          </Flex>
          <Button mt={4} colorScheme="blue" width="100%">
            Pay Now
          </Button>
        </Box>
</Flex>

    </Container>
  </>
    
  )
}

export default CheckoutPage