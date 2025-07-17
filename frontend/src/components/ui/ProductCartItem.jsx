import { Box, Button,Image, Text, Flex, HStack, VStack, Heading, IconButton } from "@chakra-ui/react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useState } from "react";


const ProductCartItem = ({ item }) => {
const [ quantity, setQuantity ] = useState(1)
const productIntent = {
    action: "addToCart",
    product_id: item.id,
    quantity,
  };
  const encodedState = encodeURIComponent(JSON.stringify(productIntent));
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function decrement() {
    if (quantity > 1 ) {
        setQuantity(quantity - 1)
    }
}

function increment() {
    if (quantity < item.quantity) {
        setQuantity(quantity + 1)
    }
}

  return (
    <Box p={6} maxW="500px" borderWidth={1} borderRadius="xl" boxShadow="md">
      <Heading size="md" mb={4}>{item.name}</Heading>
      <HStack spacing={4}>
        <Image boxSize="120px" src={item.image} alt={item.name} />
        <VStack align="start">
          <Text fontWeight="medium">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(item.price)}
          </Text>

          <HStack>
            <IconButton size="sm" onClick={decrement}><FaMinus /></IconButton>
            <Text>{quantity}</Text>
            <IconButton size="sm" onClick={increment}><FaPlus /></IconButton>
            <Text fontSize="sm" color="gray.500">Stock: {item.stock}</Text>
          </HStack>
        </VStack>
      </HStack>

      <HStack mt={6} justify="flex-end">
        <Button variant="outline" as="a" 
        href={`${BASE_URL}/auth/google?state=${encodedState}`}>Add to Cart</Button>
        <Button colorScheme="blue">Buy Now</Button>
      </HStack>
    </Box>
  );
};

export default ProductCartItem