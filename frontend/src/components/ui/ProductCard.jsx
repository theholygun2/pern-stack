import React from 'react'
import { Card, Button, Text, Image, Box, Dialog, Portal } from '@chakra-ui/react'
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
        <Link to={`/product/${product.slug}`}>
        <Button variant="solid">Edit</Button>
        </Link>
        <Dialog.Root placement="center">
          <Dialog.Trigger asChild>
            <Button>Delete Product</Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop/>
            <Dialog.Positioner>
            <Dialog.Content>
              
              <Dialog.Body>Delete {product.name}?</Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button variant="ghost" onClick={() => deleteProduct(product.id)}>Confirm</Button>
              </Dialog.Footer>
            </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </Card.Footer>
          </Card.Root >
  )
}

export default ProductCard