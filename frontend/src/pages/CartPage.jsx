import { Box, Heading, HStack, IconButton, Image, VStack, Text, FileUploadItemDeleteTrigger } from "@chakra-ui/react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useState } from "react";

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
    return(
        <Box p={6} maxW="800px">
        <Heading>Your Cart</Heading>
        <VStack>
            <Box>
                <HStack>
                    <Image boxSize="100px" src="https://images.unsplash.com/photo-1746648177616-eed4cc1a1213?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                    <Box flex="1">
                        <Text>product name</Text>
                        <Text>product price</Text>
                        <HStack>
                            <IconButton>
                                <FaMinus/>
                            </IconButton>
                            <Text>0</Text>
                            <IconButton>
                                <FaPlus/>
                            </IconButton>
                        </HStack>
                    </Box>
                    <IconButton>
                        <FaTrash/>
                    </IconButton>
                </HStack>
            </Box>
        </VStack>
    </Box>
    )
}

export default CartPage

// Add products to the cart.

// View cart contents from anywhere (e.g. cart icon in navbar).

// Increase/decrease quantity of items.

// Remove items from cart.

// See subtotal and total price update in real time.

// (Optional later: persist cart after refresh if user is logged in).