import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  VStack, Stack, SimpleGrid,Flex,List,ListItem
} from "@chakra-ui/react";

import { useState, useEffect} from "react";
import { fetchProduct } from "@/store/productActions";
import { useProductStore } from "@/store/useProductStore";
import { useParams, useNavigate} from "react-router-dom";
import ProductCartItem from "@/components/ui/ProductCartItem";
import { useUserStore } from "@/store/useUserStore";
import CartItem from "@/components/ui/CartItem";
import { useCartStore } from "@/store/useCartStore";
import ProductDetails from "@/components/ui/ProductDetails";

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
      <Container maxW="7xl">
          <SimpleGrid columns={{ base: 1, lg: 2}} spacing={{ base:8, md: 10}} py={{ base:18, md: 24}}>
              <Flex>
                  <Image src={currentProduct.image} rounded="md" fit="cover" align="center" w="100%" h={{ base: "100%", sm: "400px" , lg: "5xl"}}/>
              </Flex>
              <Stack spacing={{base: 6, md: 10}}>
                  <Box>
                      <Heading>{currentProduct.name}</Heading>
                      <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                                  {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    minimumFractionDigits: 0,
                                  }).format(currentProduct.price)}
                                </Text>
                  </Box>
  
                  <Stack>
                      <VStack spacing={{base:4, sm:6}}>
                          <Text>Description Here?</Text>
                          <Text></Text>
                      </VStack>
                      <Box>
                          <Text>Features</Text>
                          <SimpleGrid column={{base: 1, md: 2}} spacing={10}>
                              <List.Root spacing={2}>
                                  <ListItem>item 1</ListItem>
                                  <ListItem>item 2</ListItem>
                                  <ListItem>item 3</ListItem>
                              </List.Root>
                          </SimpleGrid>
                      </Box>
                      <Box>
                          <Text>
                              Product Details
                          </Text>
                          <List.Root spacing={2}>
  
                          </List.Root>
                      </Box>
                  </Stack>
              </Stack>
          </SimpleGrid>
      </Container>
      )
};

export default ProductPage;