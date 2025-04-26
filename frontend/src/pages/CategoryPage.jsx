import { useParams } from 'react-router-dom';
import { useProductStore } from '@/store/useProductStore';
import { useEffect } from 'react';
import { Container, Center, Spinner, Text } from '@chakra-ui/react';

const CategoryPage = () => {
    const { id } = useParams();
    const {products, loading, error, fetchProducts} = useProductStore()
  
    useEffect(() => {
      fetchProducts()
    }, [fetchProducts])
  
    if (loading) {
      return (
        <Center >
          <Spinner />
        </Center>
      )
    }
  
    if (error) {
      return (
        <Center minH="60vh">
          <Text color="red.500" fontSize="lg">
            {error}
          </Text>
        </Center>
      );
    }
  
    return (
      <Container>
      <AddProductModal />
      <SimpleGrid columns={3} gap="40px" >
        {products.map((product) => (
          <ProductCard key={product.id} product = {product}/>
        )
      )}
      </SimpleGrid>
    </Container>
    )
}

export default CategoryPage