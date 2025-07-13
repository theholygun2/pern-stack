import { Box, Button,  Container, Flex, Text, VStack, Heading, RadioCard, Input, Stack, Toaster} from "@chakra-ui/react"
import { useNavigate, useParams } from "react-router-dom";
import CartItem from "@/components/ui/CartItem";
import { useCartStore } from "@/store/useCartStore";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { createOrder } from "@/services/orderService";
import { useState } from "react";
import { toaster } from "@/components/ui/toaster";
import { useValidateCart } from "@/hooks/useValidateCart";

const items = [
  { value: "shopeepay", title: "ShopeePay" },
  { value: "gopay", title: "GoPay" },
  { value: "bca", title: "Bank Transfer (BCA)" },
  { value: "cod", title: "Cash on Delivery" },
];

// Move this ABOVE your CheckoutPage component
function PaymentBox({ selectedPaymentMethod, setSelectedPaymentMethod }) {
  return (
    <RadioCard.Root value={selectedPaymentMethod} onChange={(e) => setSelectedPaymentMethod(e.target.value)}>
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

  const navigate = useNavigate();
  const validateCart = useValidateCart();
  const { cart, clearCart } = useCartStore()
  const totalPrice = cart.reduce((sum, product) => {return sum + product.price * (product.cart_quantity || 1);}, 0);
  const [shippingAddress, setShippingAddress] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("shopeepay");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const hasDeletedItems = cart.some((item) => item.deleted);


const handleBuyNow = async () => {
  if (!shippingAddress) {
    toaster.error({
      title: "Failed checkout",
      description: "Shipping address is required",
    });
    return;
  }

  setIsPlacingOrder(true);

  try {
    // ✅ Re-validate cart before final submission
    const validatedCart = await validateCart();
    const hasDeleted = validatedCart.some((item) => item.deleted);
    const hasStockIssues = validatedCart.some((item) => item.stock_issue);

    if (hasDeleted) {
      toaster.error({
        title: "Some items are no longer available",
        description: "Please update your cart before checkout.",
      });
      return;
    }

    if (hasStockIssues) {
      toaster.error({
        title: "Stock issues detected",
        description: "Some items have reduced stock. Please review your cart.",
      });
      return;
    }

    const order = {
      shippingAddress,
      paymentMethod: selectedPaymentMethod
    };

    const res = await createOrder(order);

    if (res) {
      toaster.success({
        description: res.message,
      });
      clearCart();
      navigate("/user/history");
    }
  } catch (err) {
    console.error(err);
    toaster.error({
      title: "Checkout failed",
      description: "Something went wrong. Please try again.",
    });
  } finally {
    setIsPlacingOrder(false);
  }
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
        <Flex direction="column" flex="2" gap={4} borderWidth={1} borderRadius="md" minW="250px" borderStyle="bold" borderColor="black">
          <Box p={4} borderWidth={1} borderRadius="md">
            <Text fontWeight="bold" mb={2}>Shipping Address</Text>
            <Input bg="gray.200" variant="subtle" onChange={(e) => setShippingAddress(e.target.value)}/>
            {/* Address info or input form */}
          </Box>
            <Box p={4} borderWidth={1} borderRadius="md">
              <Text fontWeight="bold" mb={2}>Cart Items</Text>
              <VStack flex="2" gap={4} align="stretch">
        {cart.length === 0 ? (
          <Text>Your cart is empty.</Text>
        ) : (
          cart.map((item) => (
          <CartItem key={item.id} id={item.id} />
        ))
        )}
</VStack>
            </Box>
        </Flex>
        
        {/* Right Side: Price Summary */}
        
        <Box flex="1" p={4} borderWidth={1} borderRadius="md" minW="250px" borderStyle="bold" borderColor="black">
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
          <PaymentBox selectedPaymentMethod={selectedPaymentMethod} setSelectedPaymentMethod={setSelectedPaymentMethod} />
          {hasDeletedItems && (
  <Box mt={3} p={3} bg="red.50" border="1px solid" borderColor="red.200" borderRadius="md">
    <Text color="red.600" fontSize="sm">
      Some items in your cart are no longer available.
    </Text></Box>)}

          <Button mt={4} colorScheme="blue" width="100%" disabled={cart.length === 0 || hasDeletedItems} onClick={() => handleBuyNow({shippingAddress: shippingAddress, paymentMethod: selectedPaymentMethod})}>
            Pay Now
          </Button>
        </Box>
</Flex>

    </Container>
  </>
    
  )
}

export default CheckoutPage