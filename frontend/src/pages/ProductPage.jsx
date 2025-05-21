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

import { useState, useEffect} from "react";
import { fetchProduct } from "@/store/productActions";
import { useProductStore } from "@/store/useProductStore";
import { useParams, useNavigate} from "react-router-dom";
import ProductCartItem from "@/components/ui/ProductCartItem";

const ProductPage = () => {

  const navigate = useNavigate()
  const { currentProduct } = useProductStore()
  const { slug } = useParams()

  useEffect(() => {
    fetchProduct(slug)
  }, [slug])

  
  if (!currentProduct) {
    return (
      <Container>
        <Box>
          Product Not Found
        </Box>
      </Container>
    )
  }

  return (
    <Container>
      <ProductCartItem item={currentProduct}/>
    </Container>
  );
};

export default ProductPage;