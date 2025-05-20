import { Minus, Plus, Trash } from "lucide-react";
import { Box, Button,Image, Text, Flex, HStack, VStack, Heading, IconButton } from "@chakra-ui/react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useProductStore } from "@/store/useProductStore";

const CartItem = ({ item }) => {
  const quantity = item.cart_quantity || 1;

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
            <IconButton size="sm"><FaMinus /></IconButton>
            <Text>{quantity}</Text>
            <IconButton size="sm"><FaPlus /></IconButton>
            <Text fontSize="sm" color="gray.500">Stock: {item.quantity}</Text>
          </HStack>
        </VStack>
      </HStack>

      <HStack mt={6} justify="flex-end">
        <Button variant="outline">Add to Cart</Button>
        <Button colorScheme="blue">Buy Now</Button>
      </HStack>
    </Box>
  );
};

export default CartItem;