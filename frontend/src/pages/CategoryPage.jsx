import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useProductStore } from '@/store/useProductStore';
import { useEffect } from 'react';
import { Container, Center, Spinner, Text, SimpleGrid } from '@chakra-ui/react';
import ProductCard from '@/components/ui/ProductCard';
import { fetchProductByCategory } from '@/store/productActions';


// localhost:5173/category/:slug
const CategoryPage = () => {
    const { slug } = useParams()
    const {products, loadingProducts, loadingCategories, errorProducts, errorCategories} = useProductStore()
  
    useEffect(() => {
      fetchProductByCategory(slug)
    }, [slug])
  
    if (loadingProducts || loadingCategories) {
      return (
        <Center minH="60vh">
          <Spinner />
        </Center>
      );
    }
    
    if (errorProducts || errorCategories) {
      return (
        <Center minH="60vh">
          <Text color="red.500">
            {errorProducts || errorCategories}
          </Text>
        </Center>
      );
    }
  
    return (
      <Container>
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