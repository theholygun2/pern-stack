// pages/AdminDashboard.jsx
import { useProductStore } from "@/store/useProductStore";
import { fetchProducts, fetchCategories, deleteProduct, restoreProduct} from "@/store/productActions";
import { Button, Container, Text, Image, Center, Spinner, HStack,
  Flex,
  Heading,
  Table, Badge} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddProductModal from "@/components/ui/AddProductModal";
import { useNavigate } from "react-router-dom";
import { ColorModeButton } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import { SquarePen, ArchiveX, ArchiveRestore } from "lucide-react";


const AdminDashboard = () => {
  
  const {
      products,
      pagination,
      loadingProducts,
      errorProducts,
      categories,
      loadingCategories,
      errorCategories,
    } = useProductStore();
    
    const navigate = useNavigate()
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [ currentPage, setCurrentPage ] = useState("1")
    const productsPerPage = 15
    const totalPages = Math.ceil((pagination?.total || 0) / productsPerPage);

    const refreshProducts = () => {
      fetchProducts({ page: currentPage, limit: productsPerPage });
    };
  
    useEffect(() => {
      fetchProducts({ page: currentPage, limit: productsPerPage })
    }, [currentPage, refreshTrigger]);

    useEffect(() => {
      if (categories.length === 0) {
        fetchCategories();
      }
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

    if (loadingCategories) {
      return (
        <Center minH="60vh">
          <Spinner />
        </Center>
      );
    }
    
    if (errorCategories) {
      return (
        <Center minH="60vh">
          <Text color="red.500">{errorCategories}</Text>
        </Center>
      );
    }
    
    const handleDelete = async (id) => {
      const result = await deleteProduct(id);
    
        if (result.success) {
          toaster.success({
            title: "Deleted",
            description: "Product archived.",
          });
          refreshProducts();
        } else {
          toaster.error({
            title: "Error",
            description: "Failed to delete product.",
          });
        }
    };
    
const handleRestore = async (id) => {
  const result = await restoreProduct(id);
  if (result.success) {
    toaster.success({ title: "Restored", description: "Product restored." });
    refreshProducts(); // 🟢 Refetch updated product list from backend
  } else {
    toaster.error({ title: "Error", description: "Failed to restore product." });
  }
};


  return (
    <Container py={6}>
        <Flex alignItems="center" gap={4}>
  <ColorModeButton />
  <AddProductModal onProductAdded={refreshProducts} />
  <Button
    size="sm"
    onClick={() => navigate("/admin/history")}
  >
    History
  </Button>
  <Button onClick={() => navigate("/")}>
    Client View
  </Button>
</Flex>

      
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
      <Heading mb="2">Product List</Heading>
      <Table.Root variant="outline" showColumnBorder fontSize="lg">
        <Table.Header>
          <Table.Row fontWeight="medium" fontSize="md">
            <Table.ColumnHeader>Image</Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Price</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Stock</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {products.map((product) => (
            
            <Table.Row key={product.id} fontWeight="medium" bg={product.deleted ? "gray.100" : "transparent"} color={product.deleted ? "gray.300" : "inherit"}>
            <Table.Cell> 
              <a href={`/product/${product.slug}`} target="_blank" rel="noopener noreferrer">
              <Image boxSize="96px" objectFit="cover" src={product.image || "/placeholder.png"} alt={product.name} borderRadius="md" hover={{ opacity: 0.8 }}/></a>
            </Table.Cell>
              
              <Table.Cell fontWeight="semibold">
                <a href={`/product/${product.slug}`} target="_blank" rel="noopener noreferrer" > {product.name} </a> 
                {product.deleted && (<Badge ml={2} colorPalette="red">Archived</Badge>)}
              </Table.Cell>

              <Table.Cell>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(product.price)}
              </Table.Cell>
              <Table.Cell> {categories.find((c) => c.id === product.category_id)?.name || "Uncategorized"} </Table.Cell>

              <Table.Cell>{product.stock ?? "-"}</Table.Cell>

              {/* product Actions */}
              <Table.Cell> 
                <Flex gap={2}>
                
                <SquarePen onClick={() => navigate(`/admin/product/${product.slug}`)}style={{ cursor: "pointer"}}/>
                {!product.deleted && (
  <ArchiveX
    onClick={() => handleDelete(product.id)}
    style={{ cursor: "pointer", color: "red" }}
  />
)}
{product.deleted && (
  <ArchiveRestore
    onClick={() => handleRestore(product.id)}
    style={{ cursor: "pointer", color: "green" }}
  />
)}

                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
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
  );
}

export default AdminDashboard