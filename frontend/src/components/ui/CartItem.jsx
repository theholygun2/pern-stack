import { Box, Image, Text, Flex, HStack, VStack, IconButton } from "@chakra-ui/react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useCartStore } from "@/store/useCartStore";
import { Link } from "react-router-dom";


const CartItem = ({id}) => {
  
  const item = useCartStore((state) => state.cart.find((i) => i.id === id));
  const quantity = useCartStore((state) => state.cart.find((i) => i.id === id)?.cart_quantity || 1);
  if (!item) return null;
  const { updateQuantity, removeFromCart} = useCartStore();

  return (
    <Box p={3} maxW="1000px" borderWidth={1} borderRadius="lg" boxShadow="sm" borderColor={item.deleted? "red" : "black"} bg={item.deleted ? "gray.100" : "white"} color={item.deleted ? "gray.600" : "inherit"}>
      <Flex justify="space-between" align="center">
        <HStack spacing={4}>
          <Link to={`/product/${item.slug}`}>
          <Image boxSize="80px" objectFit="cover" src={item.image} alt={item.name} borderRadius="md" />
          </Link>
          
          <Box>
            <Link to={`/product/${item.slug}`}>
      <Text fontWeight="semibold" _hover={{ textDecoration: "underline", color: "blue.500" }}>
        {item.name}
      </Text>
      {item.deleted && (
    <Text color="red.500" fontSize="sm">
      This product is no longer available.
    </Text>
  )}
    </Link>
            <Text fontSize="sm">
              Stock: {item.stock}
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
            disabled={quantity === 1 || item.deleted}
            aria-label="Decrease quantity"
          ><FaMinus /></IconButton>
          <Text>{quantity}</Text>
          <IconButton
            size="sm"
            onClick={() => {
              if (quantity < item.stock) updateQuantity(item.id, quantity + 1);
            }}
            disabled={quantity === item.stock || item.deleted}
            aria-label="Increase quantity"
          ><FaPlus /></IconButton>
          
        </HStack>
        </VStack>
      </Flex>
    </Box>
  );
};

export default CartItem;
