import { useProductStore } from "@/store/useProductStore";
import { fetchProducts, fetchCategories } from "@/store/productActions";
import { Container,Text, SimpleGrid, Center, Spinner, VStack} from "@chakra-ui/react";
import { useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import AddProductModal from "@/components/ui/AddProductModal";
const ProductsPage = () => {
  
  const {
    products,
    loadingProducts,
    errorProducts,
    categories
  } = useProductStore();
  
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  if (loadingProducts) {
    return (
      <Center minH="60vh">
        <Spinner />
      </Center>
    );
  }
  
  if (errorProducts) {
    return (
      <Center minH="60vh">
        <Text color="red.500">{errorProducts}</Text>
      </Center>
    );
  }  

  return (
    <Container>
      <AddProductModal />
      <SimpleGrid columns={3} gap="40px" >
        {products.map((product) => {
          const category = categories.find(c => c.id === product.category_id)?.name || "uncagetorized"
          return (
            (
              <ProductCard key={product.id} product={product} category={category}/>
            )
          )
        }
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
export default ProductsPage;
