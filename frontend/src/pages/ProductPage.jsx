import { useProductStore } from '@/store/useProductStore';
import { Button, Container, HStack, Image, Spinner, Box, Input, Flex, Center, Grid, GridItem, Heading, Fieldset, Field } from '@chakra-ui/react';
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from 'lucide-react'; // Assuming all icons are from lucide-react
import React, { useEffect } from 'react';
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
    resetForm,
  } = useProductStore();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProduct(id);
  }, [fetchProduct, id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      navigate('/');
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  // if (!currentProduct) {
  //   return (
  //     <Container maxW="4xl" py={8}>
  //       <Box bg="yellow.100" p={4} rounded="md">
  //         Product not found.
  //       </Box>
  //       <Button mt={4} onClick={() => navigate('/')}>
  //         <ArrowLeftIcon size={16} style={{ marginRight: "8px" }} />
  //         Back to Products
  //       </Button>
  //     </Container>
  //   );
  // }

  return (
    <Container mx="auto" px={4} py={8} maxW="4xl">
      <Button onClick={() => navigate('/')} mb={8}>
        <ArrowLeftIcon size="4" style={{ marginRight: "8px" }}/>
        Back to Products
      </Button>

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
        <GridItem>
          <Box
          rounded="lg"
          overflow="hidden"
          shadow="lg"
          bg="gray.100"
          h="100%"
          >
            <Image
            src={currentProduct?.image} alt={currentProduct?.name} objectFit="cover" w="100%" h="100%"/>
            </Box>
            </GridItem>

        {/* PRODUCT FORM */}

        <GridItem>
          <Box shadow="lg" rounded="lg" p={6}>
            <Heading size="lg" mb={6}/>

            <form onSubmit={(e) => {e.preventDefault(); updateProduct(id);}}>
              <Fieldset.Root>
                <Fieldset.Content>
                  {/* PRODUCT Name */}
                  <Field.Root mb={4}>
                    <Field.Label>Product Name</Field.Label>
                    <Input type="text" placeholder="Enter product name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value})}/>
                  </Field.Root>

                  {/* PRODUCT Price */}
                  <Field.Root mb={4}>
                    <Field.Label>Price</Field.Label>
                    <Input type="number" min="0" step="0.01" placeholder="0.00" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })}/>
                  </Field.Root>

                  {/* PRODUCT Image URL */}
                  <Field.Root mb={4}>
                    <Field.Label>Image URL</Field.Label>
                    <Input type="text" placeholder="https://example.com/image.jpg" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })}/>
                  </Field.Root>
                </Fieldset.Content>
              </Fieldset.Root>

              {/* FORM ACTIONS */}
              <Flex justify="space-between" mt={8}>
                <Button colorScheme="red" onClick={handleDelete}>
                  <Trash2Icon size={16} style={{ marginRight: "8px" }} />
                  Delete Product
                </Button>

                <Button
                  colorScheme="blue"
                  type="submit"
                  isDisabled={loading || !formData.name || !formData.price || !formData.image}
                >
                  {loading ? (
                    <Spinner size="sm" />
                  ) : (
                    <>
                      <SaveIcon size={16} style={{ marginRight: "8px" }} />
                      Save Changes
                    </>
                  )}
                </Button>
              </Flex>
            </form>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
}

export default ProductPage;