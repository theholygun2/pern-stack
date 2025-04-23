import React from 'react'
import { Card, Button, Text, Image, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useProductStore } from '@/store/useProductStore'

function ProductCard({ product }) {
    const { deleteProduct, categories } = useProductStore()
  return (
    <Card.Root maxW="sm" overflow="hidden">
      <Box h="250px" overflow="hidden">
      <Image src={product.image} alt={product.name} objectFit="cover"  w="100%" h="100%"/>
      </Box>
      <Card.Body gap="2" p="4">
        <Card.Title>{product.name}</Card.Title>
        <Card.Description>
        {categories.find(c => c.id === product.category_id)?.name}
        </Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          ${product.price}
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Link to={`/product/${product.id}`}>
        <Button variant="solid">Edit</Button>
        </Link>
        
        <Button variant="ghost" onClick={() => deleteProduct(product.id)}>Delete Product</Button>
      </Card.Footer>
          </Card.Root >
  )
}

export default ProductCard