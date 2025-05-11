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

    const increaseQty = (id) => {
        setCartItems(items => 
            items.map(item => 
                item.id === id ? { ...item, quantity: item.quantity + 1} : item
            )
        )
    }

    const decreaseQty = (id) => {
        setCartItems(items => 
            items.map(item => 
                item.id === id ? { ...item, quantity: item.quantity - 1} : item
            )
        )
    }

    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id))
    }

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity
    )

    return(
        <Box p={6} maxW="800px">
        <Heading>Your Cart</Heading>
        <VStack>
            {cartItems.map(item => (
                <Box key={item.id} >
                    <HStack>
                        <Image boxSize="100px" src={item.image} alt={item.name}/>
                        <Box>
                            <Text>{item.name}</Text>
                            <Text>{item.price}</Text>
                            <HStack>
                                <IconButton onClick={decreaseQty}><FaMinus/></IconButton>
                                <Text>{item.quantity}</Text>
                                <IconButton onClick={increaseQty}><FaPlus/></IconButton>
                            </HStack>
                        </Box>
                    </HStack>
                </Box>
            ))}
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