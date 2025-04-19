import { useProductStore } from "@/store/useProductStore";
import { Container,Text, SimpleGrid, Center, Spinner} from "@chakra-ui/react";
import { useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import AddProductModal from "@/components/ui/AddProductModal";
import NameForm from "@/components/ui/NameForm";
const HomePage = () => {
  
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
      <AddProductModal></AddProductModal>
      <SimpleGrid columns={3} gap="40px" >
        {products.map((product) => (
          <ProductCard key={product.id} product = {product}/>
        )
      )}
      </SimpleGrid>
    </Container>
  )
}
export default HomePage;
