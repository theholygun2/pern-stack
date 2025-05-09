import { SimpleGrid, Box, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useProductStore } from '@/store/useProductStore'
import { fetchCategories } from "@/store/productActions"
import { useEffect } from "react"

function CategoryBar() {
  // Get categories from the store
  const { categories, loadingCategories, errorCategories } = useProductStore()

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <SimpleGrid columns={[2, 3, 4]} spacing={4} mt={4}>
      {categories.map((cat) => (
        <Box 
          as={Link} 
          to={`/category/${cat.slug}`}  // Adjust the path based on your routing setup
          p={4} 
          borderWidth="1px" 
          rounded="md" 
          _hover={{ bg: "gray.100" }}
          key={cat.id}
        >
          <Text fontWeight="medium">{cat.name}</Text>
        </Box>
      ))}
    </SimpleGrid>
  )
}

export default CategoryBar
