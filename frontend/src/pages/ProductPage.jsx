import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  VStack
} from "@chakra-ui/react";

import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useState, useEffect} from "react";
import { fetchProduct } from "@/store/productActions";
import { useProductStore } from "@/store/useProductStore";
import { useParams} from "react-router-dom";

const ProductPage = () => {

  const { currentProduct } = useProductStore()
  const { slug } = useParams()

  useEffect(() => {
    fetchProduct(slug)
  }, [slug])

  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    if (quantity < currentProduct.quantity) {
      setQuantity(q => q + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  if (!currentProduct) {
    return (
      <Container>
        <Box>
          Product Not Found
        </Box>
      </Container>
    )
  }

  const subtotal = (currentProduct.price * quantity);

  return (
    <Box p={6} maxW="500px" borderWidth={1} borderRadius="xl" boxShadow="md">
      <Heading size="md" mb={4}>
        {currentProduct.name}
      </Heading>
      <HStack spacing={4}>
        <Image boxSize="120px" src={currentProduct.image} alt={currentProduct.name} />
        <VStack align="start">
          <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                  {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(currentProduct.price)}
                  </Text>
          <HStack>
            <IconButton onClick={decreaseQty} size="sm"><FaMinus/></IconButton>
            <Text>{quantity}</Text>
            <IconButton onClick={increaseQty} size="sm"><FaPlus/></IconButton>
            <Text fontSize="sm" color="gray.500">
              Stock: {currentProduct.quantity}
            </Text>
          </HStack>
          <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                  {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(subtotal)}
                  </Text>
        </VStack>
      </HStack>

      <HStack mt={6} justify="flex-end">
        <Button variant="outline">Add to Cart</Button>
        <Button colorScheme="blue">Buy Now</Button>
      </HStack>
    </Box>
    
  );
};

export default ProductPage;