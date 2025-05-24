import { Box, Button, Image, Text, Flex, HStack, VStack, IconButton } from "@chakra-ui/react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useCartStore } from "@/store/useCartStore";

const CartItem = ({ item }) => {
  const quantity = useCartStore((state) =>
    state.cart.find((product) => product.id === item.id)?.cart_quantity || 1
  );

  const { updateQuantity, removeFromCart, setCart} = useCartStore();

  return (
    <Box p={3} maxW="1000px" borderWidth={1} borderRadius="lg" boxShadow="sm">
      <Flex justify="space-between" align="center">
        <HStack spacing={4}>
          <Image boxSize="80px" objectFit="cover" src={item.image} alt={item.name} borderRadius="md" />
          <Box>
            <Text fontWeight="semibold">{item.name}</Text>
            <Text fontSize="sm" color="gray.500">
              Stock: {item.quantity}
            </Text>
          </Box>
        </HStack>
        <VStack>
        <Text fontWeight="medium">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(item.price * quantity)}
          </Text>
        <HStack spacing={3}>
        
          <IconButton
          color="red.500"
          size="sm"
          aria-label="Decrease quantity"
          onClick={ async () => removeFromCart(item.id)}
          ><FaTrash/></IconButton>
          <IconButton
            size="sm"
            onClick={() => updateQuantity(item.id, quantity - 1)}
            disabled={quantity === 1}
            aria-label="Decrease quantity"
          ><FaMinus /></IconButton>
          <Text>{quantity}</Text>
          <IconButton
            size="sm"
            onClick={() => {
              if (quantity < item.quantity) updateQuantity(item.id, quantity + 1);
            }}
            disabled={quantity === item.quantity}
            aria-label="Increase quantity"
          ><FaPlus /></IconButton>
          
        </HStack>
        </VStack>
      </Flex>
    </Box>
  );
};

export default CartItem;
