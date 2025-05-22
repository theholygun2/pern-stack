import { Box, Heading, HStack, Container, IconButton, Image, VStack, Text, FileUploadItemDeleteTrigger } from "@chakra-ui/react";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import CartItem from "@/components/ui/CartItem";

  const CartPage = () => {
    const { cart } = useCartStore();
    const { user } = useUserStore();
  
    return (
      <Container>
        {user ? (
          <>
            {cart.map((product) => (
              <CartItem key={product.id} item={product} />
            ))}
          </>
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