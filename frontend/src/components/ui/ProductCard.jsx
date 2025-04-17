import React from 'react'
import { Card, Button, Text, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useProductStore } from '@/store/useProductStore'

function ProductCard({ product }) {
    const { deleteProduct } = useProductStore()
  return (
    <Card.Root maxW="sm" overflow="hidden">
            <Image
              src={product.image}
        alt={product.name}
      />
      <Card.Body gap="2">
        <Card.Title>{product.name}</Card.Title>
        <Card.Description>
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