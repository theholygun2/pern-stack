import { useProductStore } from "@/store/useProductStore";
import { Container,Text, SimpleGrid, Center, Spinner, VStack} from "@chakra-ui/react";
import { useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import AddProductModal from "@/components/ui/AddProductModal";
const HomePage = () => {
  
  const {
    products,
    loadingProducts,
    errorProducts,
    fetchProducts,
    fetchCategories,
    loadingCategories,
    errorCategories
  } = useProductStore();
  
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  
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
      <AddProductModal />
      <SimpleGrid columns={3} gap="40px" >
        {products.map((product) => (
          <ProductCard key={product.id} product = {product}/>
        )
      )}
      </SimpleGrid>
      <VStack gap={100}>
        <Text>
          dfsafsf
        </Text>
        <Text>
          dfsafsf
        </Text><Text>
          dfsafsf
        </Text><Text>
          dfsafsf
        </Text><Text>
          dfsafsf
        </Text><Text>
          dfsafsf
        </Text><Text>
          dfsafsf
        </Text><Text>
          dfsafsf
        </Text><Text>
          dfsafsf
        </Text><Text>
          dfsafsf
        </Text><Text>
          dfsafsf
        </Text><Text>
          dfsafsf
        </Text><Text>
          dfsafsf
        </Text><Text>
          dfsafsf
        </Text><Text>
          dfsafsf
        </Text><Text>
          dfsafsf
        </Text>
      </VStack>
    </Container>
  )
}
export default HomePage;
