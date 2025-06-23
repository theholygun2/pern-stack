// pages/AdminDashboard.jsx
import { useProductStore } from "@/store/useProductStore";
import { fetchProducts, fetchCategories, deleteProduct} from "@/store/productActions";
import { Button, Container, Text, Image, Center, Spinner, HStack,
  Flex,
  Heading,
  Table,} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddProductModal from "@/components/ui/AddProductModal";
import { useNavigate } from "react-router-dom";
import { ColorModeButton } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import { SquarePen, Trash2 } from "lucide-react";


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
    const [ currentPage, setCurrentPage ] = useState("1")
    const productsPerPage = 15
    const totalPages = Math.ceil((pagination?.total || 0) / productsPerPage);
  
  
    useEffect(() => {
      fetchProducts({ page: currentPage, limit: productsPerPage })
    }, [currentPage]);

    useEffect(() => {
      if (categories.length === 0) {
        fetchCategories();
      }
    }, [categories]);
    
  
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
      if (window.confirm("Are you sure you want to delete this product?")) {
        const result = await deleteProduct(id);
    
        if (result.success) {
          toaster.success({
            title: "Deleted",
            description: "Product removed.",
          });
        } else {
          toaster.error({
            title: "Error",
            description: "Failed to delete product.",
          });
        }
      }
    };
    
    
    

  return (
    <Container py={6}>
        <Flex alignItems="center" gap={4}>
  <ColorModeButton />
  <AddProductModal />
  <Button
    size="sm"
    onClick={() => navigate("/admin/history")}
  >
    History
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
      <Table.Root variant="outline" showColumnBorder>
        <Table.Header>
          <Table.Row fontWeight="medium">
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
            
            <Table.Row key={product.id} fontWeight="medium">
              <Table.Cell>
                <Image
                  boxSize="64px"
                  objectFit="cover"
                  src={product.image || "/placeholder.png"}
                  alt={product.name}
                  borderRadius="md"
                />
              </Table.Cell>
              <Table.Cell fontWeight="semibold">
                {product.name}
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
              <Table.Cell>
                <Flex gap={2}>
                <SquarePen
  onClick={() => navigate(`/admin/product/${product.slug}`)}
  style={{ cursor: "pointer", marginRight: "8px" }}
/>

<Trash2
  onClick={() => handleDelete(product.id)}
  style={{ cursor: "pointer", color: "red" }}
/>

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