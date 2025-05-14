import { Box, Button,  Container, Flex, Text } from "@chakra-ui/react"
import { useParams } from "react-router-dom";

const CheckoutPage = () => {

  const {id} = useParams("id")
  
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
              {/* List of items in the cart */}
            </Box>
        </Flex>
        
        {/* Right Side: Price Summary */}
        
        <Box flex="1" p={4} borderWidth={1} borderRadius="md" minW="250px">
          <Text fontWeight="bold" mb={2}>Order Summary</Text>
          <Flex justify="space-between">
            <Text>Subtotal</Text>
            <Text>Rp XXX</Text>
          </Flex>
          <Flex justify="space-between">
            <Text>Tax</Text>
            <Text>Rp XXX</Text>
          </Flex>
          <Flex justify="space-between" mt={2} fontWeight="bold">
            <Text>Total</Text>
            <Text>Rp XXX</Text>
          </Flex>
          <Button mt={4} colorScheme="blue" width="100%">
            Pay Now
          </Button>
        </Box>
</Flex>

    </Container>
  )
}

export default CheckoutPage