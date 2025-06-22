import {
    Button,
    Container,
    Flex,
    Heading,
    Image,
    Spinner,
    Table,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  
  const AdminProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const res = await axios.get("http://localhost:3000/api/product", {
            withCredentials: true,
          });
          setProducts(res.data.data.products || []);
        } catch (err) {
          console.error("Failed to fetch products", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, []);
  
    const handleDelete = async (id) => {
      const confirmDelete = window.confirm("Delete this product?");
      if (!confirmDelete) return;
  
      try {
        await axios.delete(`http://localhost:3000/api/product/${id}`, {
          withCredentials: true,
        });
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } catch (err) {
        console.error("Failed to delete product", err);
      }
    };
  
    if (loading) {
      return (
        <Container py={6}>
          <Spinner />
        </Container>
      );
    }
  
    return (
      <Container py={6}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="lg">Product List</Heading>
          <Button colorScheme="blue" onClick={() => navigate("/product/new")}>
            Add Product
          </Button>
        </Flex>
  
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
              <Table.Row key={product.id}>
                <Table.Cell>
                  <Image
                    boxSize="48px"
                    objectFit="cover"
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    borderRadius="md"
                  />
                </Table.Cell>
                <Table.Cell fontWeight="semibold">
                  <a href={`/admin/products/${product.slug}`}>{product.name}</a>
                </Table.Cell>
                <Table.Cell>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(product.price)}
                </Table.Cell>
                <Table.Cell>{product.category_name || "–"}</Table.Cell>
                <Table.Cell>{product.stock ?? "–"}</Table.Cell>
                <Table.Cell>
                  <Flex gap={2}>
                    <Button
                      size="sm"
                      colorScheme="yellow"
                      onClick={() =>
                        navigate(`/admin/products/${product.slug}`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Container>
    );
  };
  
  export default AdminProductListPage;
  