import React from 'react'
import { Card, Text, Image, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function ProductCard({ product, category }) {
  return (
    <Link to={`/product/${product.slug}`}>
      <Card.Root
  w="100%"
  h="100%" // Ensures card fills its container height
  display="flex"
  flexDirection="column"
  overflow="hidden"
  transition="all 0.2s"
  _hover={{ transform: "scale(1.02)", boxShadow: "lg", cursor: "pointer" }}
>
  <Box aspectRatio="1" overflow="hidden">
    <Image
      src={product.image}
      alt={product.name}
      objectFit="cover"
      w="100%"
      h="100%"
    />
  </Box>
  <Card.Body gap="2" p="4" flex="1" display="flex" flexDirection="column">
    <Card.Title noOfLines={2}>{product.name}</Card.Title>
    <Card.Description noOfLines={1}>{category}</Card.Description>
    <Text
      textStyle="2xl"
      fontWeight="medium"
      letterSpacing="tight"
      mt="auto"
    >
      {new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(product.price)}
    </Text>
  </Card.Body>
</Card.Root>

    </Link>
  )
}

export default ProductCard
