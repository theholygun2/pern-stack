import { useLocation, useSearchParams } from 'react-router-dom';
import { useProductStore } from '@/store/useProductStore';
import { useEffect } from 'react';
import { Container, Center, Spinner, Text, SimpleGrid } from '@chakra-ui/react';
import AddProductModal from '@/components/ui/AddProductModal';
import ProductCard from '@/components/ui/ProductCard';

const CategoryPage = () => {
    const [ searchParams ] = useSearchParams()
    const category_slug = searchParams.get("category_slug")
    //const name = searchParams.get("name")
    const {products, loading, error, fetchProducts} = useProductStore()
  
    useEffect(() => {
      fetchProducts( {category_slug: category_slug})
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