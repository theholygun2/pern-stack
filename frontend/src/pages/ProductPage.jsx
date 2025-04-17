import { useProductStore } from '@/store/useProductStore';
import { Button, Container, HStack, Image, Spinner } from '@chakra-ui/react';
import { ArrowLeftIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function ProductPage() {

  const {
    currentProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchProduct,
    updateProduct,
    deleteProduct,
    resetForm
  } = useProductStore()

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProduct(id)
  }, [fetchProduct, id])

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <Spinner></Spinner>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <Container>
      <Button onClick={() => {resetForm(); navigate("/")}}>
        <ArrowLeftIcon size="4" mr="2"/>
        Back to Products
      </Button>

      <HStack>
        <Box>
          <Image src={currentProduct?.image}>

          </Image>
        </Box>
      </HStack>

    </Container>
  )
}

export default ProductPage