import { SimpleGrid, Box, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

function CategoryBar({ categories }) {
  return (
    <SimpleGrid columns={[2, 3, 4]} spacing={4} mt={4}>
      {categories.map((cat) => (
        <Box 
          as={Link} 
          to={`/categories/${cat.id}`} 
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