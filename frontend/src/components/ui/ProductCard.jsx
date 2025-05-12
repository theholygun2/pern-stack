import React from 'react'
import { Card, Text, Image, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function ProductCard({ product, category }) {
  return (
    <Link to={`/product/${product.slug}`}>
      <Card.Root
        maxW="sm"
        overflow="hidden"
        transition="all 0.2s"
        _hover={{ transform: "scale(1.02)", boxShadow: "lg", cursor: "pointer" }}
      >
        <Box h="250px" overflow="hidden">
          <Image
            src={product.image}
            alt={product.name}
            objectFit="cover"
            w="100%"
            h="100%"
          />
        </Box>
        <Card.Body gap="2" p="4">
          <Card.Title>{product.name}</Card.Title>
          <Card.Description>{category}</Card.Description>
          <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
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
