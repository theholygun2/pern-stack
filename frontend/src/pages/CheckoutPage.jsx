import { Box, Button,  Container, Flex, Text, VStack, Heading, RadioCard } from "@chakra-ui/react"
import { useParams } from "react-router-dom";
import CartItem from "@/components/ui/CartItem";
import { useCartStore } from "@/store/useCartStore";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { createOrder } from "@/services/orderService";

const items = [
  { value: "shopeepay", title: "ShopeePay" },
  { value: "gopay", title: "GoPay" },
  { value: "bca", title: "Bank Transfer (BCA)" },
  { value: "cod", title: "Cash on Delivery" },
];

// Move this ABOVE your CheckoutPage component
function PaymentBox() {
  return (
    <RadioCard.Root defaultValue="shopeepay">
      <RadioCard.Label>Select Payment Method</RadioCard.Label>
      <VStack align="stretch">
        {items.map((item) => (
          <RadioCard.Item key={item.value} value={item.value}>
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
              <RadioCard.ItemIndicator />
            </RadioCard.ItemControl>
          </RadioCard.Item>
        ))}
      </VStack>
    </RadioCard.Root>
  );
}

const CheckoutPage = () => {
  
  const { cart } = useCartStore()
  const {id} = useParams("id")
  const totalPrice = cart.reduce((sum, product) => {return sum + product.price * (product.cart_quantity || 1);}, 0);

  const items = [
    { value: "gopay", title: "shopeepay"}
  ]
  const handleBuyNow = async (order) => {
    const res = await createOrder(order)
    return res
  };

  return (
  <>
  <Box p={4}>
  <ChakraLink  as={Link} to="/" alignItems="center" fontWeight="bold">
    <Heading size="md" mb="1px">SukaLupa.com</Heading>
  </ChakraLink>
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
          <PaymentBox/>
          <Button mt={4} colorScheme="blue" width="100%" onClick={() => handleBuyNow([{cart: cart, shipAddress: "Kelapa Gading", status: "pending", paymentMethod: "go-pay"}])}>
            Pay Now
          </Button>
        </Box>
</Flex>

    </Container>
  </>
    
  )
}

export default CheckoutPage