import { useProductStore } from "@/store/useProductStore";
import { fetchProducts} from "@/store/productActions";
import { Button, Container, Text, Image,  SimpleGrid, Center, Spinner, HStack} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ui/ProductCard";
import AddProductModal from "@/components/ui/AddProductModal";
import sadDog from '@/assets/saddog.svg'
const ProductsPage = () => {
  
  const {
    products,
    pagination,
    loadingProducts,
    errorProducts,
    categories
  } = useProductStore();
  
  const [ currentPage, setCurrentPage ] = useState("1")
  const productsPerPage = 15
  const totalPages = Math.ceil((pagination?.total || 0) / productsPerPage);


  useEffect(() => {
    fetchProducts({ page: currentPage, limit: productsPerPage })
  }, [currentPage]);

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
    <Container py="10px">
      <AddProductModal />
      {products.length === 0 ? (<Center minH="60vh" flexDirection="column" textAlign="center">
          <Image mb={4} src={sadDog} alt="No products" boxSize="200px" opacity={0.7} objectFit="contain"/>
          <Text fontSize="xl" fontWeight="medium">Oops! No products in this category.</Text>
        </Center>) : (<SimpleGrid columns={{ base: 2, md: 5 }} spacing="4">
        {products.map((product) => {
          const category = categories.find(c => c.id === product.category_id)?.name || "uncagetorized"
          return (
            (
              <ProductCard key={product.id} product={product} category={category}/>
            )
          )
        }
      )}
      </SimpleGrid>)}
      <HStack mt={6} justify="center">
  {Array.from({ length: totalPages }).map((_, index) => {
    const page = index + 1;
    return (
      <Button
        key={page}
        variant={currentPage === page ? "solid" : "outline"}
        colorScheme="yellow"
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </Button>
    );
  })}
</HStack>
    </Container>
  )
}
export default ProductsPage;
