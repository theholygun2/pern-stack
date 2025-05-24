import { Box, Heading, Flex, Container, Image, VStack, Text, FileUploadItemDeleteTrigger } from "@chakra-ui/react";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import CartItem from "@/components/ui/CartItem";

  const CartPage = () => {
    const { cart = [] } = useCartStore();
    const { user } = useUserStore();

    const totalPrice = cart.reduce((sum, product) => {
      return sum + product.price * (product.cart_quantity || 1);
    }, 0);

    return (
<Container p="4" maxW="container.xl">
  {user ? (
    <Flex gap={6} align="flex-start">
      {/* Cart Items */}
      <VStack flex="2" gap={4} align="stretch">
        {cart.length === 0 ? (
          <Text>Your cart is empty.</Text>
        ) : (
          cart.map((product) => (
          <CartItem key={product.id} item={product} />
        ))
        )}
</VStack>


      {/* Summary / Side Box */}
      <Box flex="1" borderWidth={1} borderRadius="lg" p={4} boxShadow="md" position="sticky" top="4rem">
        <Heading size="md" mb={4}>Order Summary</Heading>
        <Text>Total Items: {cart.length}</Text>
        <Text>Total Price: {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, }).format(totalPrice)} </Text>

        {/* You can add total price, checkout button, etc. here */}
      </Box>
    </Flex>
  ) : (
    <VStack spacing={4} mt={10}>
      <Heading size="md">Please log in to view your cart</Heading>
      <Text>Sign in with Google to access your saved items.</Text>
      <a href="http://localhost:3000/auth/google">
        <Image
          src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png"
          alt="Sign in with Google"
          _hover={{ opacity: 0.8 }}
        />
      </a>
    </VStack>
  )}
</Container>

    );
  };
  

export default CartPage

// Add products to the cart.

// View cart contents from anywhere (e.g. cart icon in navbar).

// Increase/decrease quantity of items.

// Remove items from cart.

// See subtotal and total price update in real time.

// (Optional later: persist cart after refresh if user is logged in).