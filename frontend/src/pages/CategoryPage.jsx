import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useProductStore } from '@/store/useProductStore';
import { useEffect } from 'react';
import { Container, Center, Spinner, Text, SimpleGrid, VStack, Image } from '@chakra-ui/react';
import ProductCard from '@/components/ui/ProductCard';
import { fetchProductByCategory} from '@/store/productActions';
import sadDog from '@/assets/saddog.svg'


// localhost:5173/category/:slug
const CategoryPage = () => {
    const { slug } = useParams()
    const {products, categories, loadingProducts, loadingCategories, errorProducts, errorCategories} = useProductStore()
  
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
        {products.length === 0 ? (<Center minH="60vh" flexDirection="column" textAlign="center">
    <Image mb={4} src={sadDog} alt="No products" boxSize="200px" opacity={0.7} objectFit="contain"/>
    <Text fontSize="xl" fontWeight="medium">Oops! No products in this category.</Text>
  </Center>) 
        : (<SimpleGrid columns={3} gap="40px" >
        {products.map((product) => {
          const category = categories.find(c => c.id === product.category_id)?.name || "uncagetorized"
          return (
            (
              <ProductCard key={product.id} product = {product} category={category}/>
            )
          )
        }
      )}
      </SimpleGrid>)}
    </Container>
    )
}

export default CategoryPage