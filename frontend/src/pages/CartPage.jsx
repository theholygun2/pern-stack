import { Box, Heading } from "@chakra-ui/react";

const initialCart = [
    {
      id: 1,
      name: 'Wireless Headphones',
      image: 'https://via.placeholder.com/100',
      price: 79.99,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Gaming Mouse',
      image: 'https://via.placeholder.com/100',
      price: 49.99,
      quantity: 2,
    },
  ];

const CartPage = () => {
    const [cartItems, setCartItems] = useState(initialCart);  
    <Box>
        <Heading>Your Cart</Heading>
    </Box>
}

export default CartPage

// Add products to the cart.

// View cart contents from anywhere (e.g. cart icon in navbar).

// Increase/decrease quantity of items.

// Remove items from cart.

// See subtotal and total price update in real time.

// (Optional later: persist cart after refresh if user is logged in).