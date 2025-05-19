import { Box, Heading, HStack, Container, IconButton, Image, VStack, Text, FileUploadItemDeleteTrigger } from "@chakra-ui/react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const initialCart = [
    {
      id: 1,
      name: 'Wireless Headphones',
      image: 'https://images.unsplash.com/photo-1746483965618-d7dc246439a3?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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

  //users picks selected items here fromt he prouduct page

  const { cart } = useCartStore()
    const navigate = useNavigate()
    return(
      <Container>
  <Text>Cart ID: {cart.id}</Text>
  {cart.products?.map((product) => (
    <Box key={product.id}>
      <Text>{product.name}</Text>
      <Text>Quantity: {product.cart_quantity}</Text>
    </Box>
  ))}
</Container>

  )

}

export default CartPage

// Add products to the cart.

// View cart contents from anywhere (e.g. cart icon in navbar).

// Increase/decrease quantity of items.

// Remove items from cart.

// See subtotal and total price update in real time.

// (Optional later: persist cart after refresh if user is logged in).