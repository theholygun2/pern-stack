import React from 'react'
import { Card, Button, Text, Image, Box, Dialog, Portal } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { deleteProduct } from '@/store/productActions'

function ProductEdit({ product, category}) {
  return (
    <Card.Root maxW="sm" overflow="hidden">
      <Box h="250px" overflow="hidden">
      <Image src={product.image} alt={product.name} objectFit="cover"  w="100%" h="100%"/>
      </Box>
      <Card.Body gap="2" p="4">
        <Card.Title>{product.name}</Card.Title>
        <Card.Description>
        {category}
        </Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
        {new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(product.price)}
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

export default ProductEdit