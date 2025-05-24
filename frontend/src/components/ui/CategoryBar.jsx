import { Box, Text, HStack, Skeleton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from '@/store/useProductStore';
import { fetchCategories } from "@/store/productActions";
import { useEffect } from "react";

function CategoryBar() {
  const { categories, loadingCategories } = useProductStore();

  useEffect(() => {
    if (categories.length === 0) fetchCategories();
  }, []);

  if (loadingCategories) {
    return (
      <HStack spacing={3} mt={4}>
        {Array(5)
          .fill(null)
          .map((_, idx) => (
            <Skeleton key={idx} height="40px" width="100px" borderRadius="md" />
          ))}
      </HStack>
    );
  }

  return (
    <HStack spacing={3} mt={4} overflowX="auto" pb={2} className="no-scrollbar">
      <Box
        as={Link}
        to={`/products`}
        px={4}
        py={2}
        borderWidth="1px"
        borderRadius="full"
        _hover={{ bg: "gray.200" }}
        minW="fit-content"
      >
        <Text fontWeight="medium">All</Text>
      </Box>
      {categories.map((cat) => (
        <Box
          as={Link}
          to={`/category/${cat.slug}`}
          key={cat.id}
          px={4}
          py={2}
          borderWidth="1px"
          borderRadius="full"
          _hover={{ bg: "gray.200" }}
          minW="fit-content"
        >
          <Text fontWeight="medium">{cat.name}</Text>
        </Box>
      ))}
    </HStack>
  );
}

export default CategoryBar;
