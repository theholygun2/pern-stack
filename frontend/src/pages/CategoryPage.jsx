import { useParams } from 'react-router-dom';

const CategoryPage = () => {
    const { category } = useParams();
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