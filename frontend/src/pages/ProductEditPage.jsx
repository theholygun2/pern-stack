import { useProductStore } from '@/store/useProductStore';
import {
  Button,
  Container,
  Image,
  Spinner,
  Box,
  Input,
  Flex,
  Center,
  Grid,
  GridItem,
  Heading,
  Text,
  FileUpload
} from '@chakra-ui/react';
import { ArrowLeftIcon, FileUp, SaveIcon, Trash2Icon } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchProduct,
  updateProduct,
  deleteProduct,
  fetchCategories,
} from '@/store/productActions';
import { NumericFormat } from 'react-number-format';
import { toaster } from '@/components/ui/toaster';
import { uploadImage } from '@/lib/uploadImage';

function ProductEditPage() {
  const {
    currentProduct,
    formData,
    categoryList,
    setFormData,
    setUploadedFile,
    loadingProducts,
    errorProducts,
    loadingCategories,
    resetForm
  } = useProductStore();

  const navigate = useNavigate();
  const { slug } = useParams();

  // Fetch product when slug changes
  useEffect(() => {
    if (slug) {
      resetForm();
      fetchProduct(slug);
    }
  }, [slug]);

  // Fetch categories on first render
  useEffect(() => {
    if (!categoryList || categoryList.items.length === 0) {
      fetchCategories();
    }
  }, []);

  // Clean up preview URL when image changes
  useEffect(() => {
    return () => {
      if (formData.image?.startsWith('blob:')) {
        URL.revokeObjectURL(formData.image);
      }
    };
  }, [formData.image]);


  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(formData.id);
      navigate('/');
    }
  };

const handleUpdate = async (e) => {
  e.preventDefault();

  const { uploadedFile } = useProductStore.getState();
  let imageChanged = formData.image?.startsWith("blob:");

  const hasChanges = Object.entries(formData).some(
    ([key, value]) => value !== currentProduct[key]
  );

  if (!hasChanges && !imageChanged) {
    toaster({ title: "Nothing changed!" });
    return;
  }

  try {
    let finalImageUrl = formData.image;

    if (imageChanged && uploadedFile) {

      const newUrl = await uploadImage(currentProduct.id, uploadedFile);
      finalImageUrl = newUrl;

      // update formData with new image URL
      setFormData(prev => ({ ...prev, image: newUrl }));
    }

    // Now call the backend update
    await updateProduct({
      ...formData,
      image: finalImageUrl, // make sure it's not a blob:
    });

    toaster.success({ title: "Product updated!" });
    navigate('/admin/dashboard'); // or wherever
  } catch (err) {
    console.error(err);
    toaster({ title: "Update failed", variant: "destructive" });
  }
};


  

  if (loadingProducts || loadingCategories) {
    return (
      <Center minH="60vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (errorProducts) {
    return (
      <Container maxW="xl" py={10}>
        <Box bg="red.100" p={6} rounded="md">
          <Text color="red.700">{errorProducts}</Text>
        </Box>
      </Container>
    );
  }

  if (!currentProduct) {
    return (
      <Container maxW="xl" py={10}>
        <Box bg="yellow.100" p={6} rounded="md">
          <Text>Product not found.</Text>
        </Box>
        <Button mt={4} onClick={() => navigate('/')}>
          <ArrowLeftIcon size={16} style={{ marginRight: '8px' }} />
          Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <Container maxW="5xl" py={10}>
      <Button variant="ghost" mb={6} onClick={() => navigate('/admin/dashboard')}>
        <ArrowLeftIcon size={16} style={{ marginRight: '8px' }} />
        Back to Dashboard
      </Button>

      <Heading size="lg" mb={6}>
        Edit Product
      </Heading>

      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={10}>
        {/* IMAGE PREVIEW */}
        <GridItem>
        <Box
  position="relative"
  w="100%"
  paddingTop="75%" // 4:3 aspect ratio (or use 100% for square)
  bg="gray.100"
  rounded="lg"
  overflow="hidden"
  shadow="md"
>
  <Image
    src={formData.image}
    alt={formData.name}
    objectFit="cover"
    position="absolute"
    top={0}
    left={0}
    width="100%"
    height="100%"
  />
</Box>

        </GridItem>

        {/* FORM */}
        <GridItem>
          <Box shadow="md" rounded="lg" p={6} bgColor="red.100" borderColor="black" borderWidth="1px">
            <form>
              {/* Product Name */}
              <Box mb={4}>
                <Text fontWeight="semibold" mb={1}>
                  Product Name
                </Text>
                <Input
                  type="text"
                  value={formData.name}
                  variant="filled"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter product name"
                />
              </Box>

              {/* Price */}
              <Box mb={4}>
                <Text fontWeight="semibold" mb={1}>
                  Price (IDR)
                </Text>
                <NumericFormat
                  variant="filled"
                  customInput={Input}
                  thousandSeparator="."
                  decimalSeparator=","
                  allowNegative={false}
                  decimalScale={0}
                  placeholder="0"
                  value={formData.price}
                  onValueChange={(values) =>
                    setFormData({ ...formData, price: values.value })
                  }
                />
              </Box>

              {/* Image URL */}
              <Box mb={4}>
                <FileUpload.Root>
                  <FileUpload.HiddenInput accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setUploadedFile(file);
                    console.log('file', file)

                    const previewURL = URL.createObjectURL(file);
                    console.log("previewURL: ", previewURL)
                    setFormData((prev) => ({ ...prev, image: previewURL}));
                  }}/>
                  <FileUpload.Trigger asChild>
                    <Button >Change Image</Button>
                  </FileUpload.Trigger>
                </FileUpload.Root>
              </Box>

              {/* Category */}
              <Box mb={4}>
                <Text fontWeight="semibold" mb={1}>
                  Category
                </Text>
                <select
                  value={formData.category_id}
                  onChange={(e) =>
                    setFormData({ ...formData, category_id: e.target.value })
                  }
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E0',
                  }}
                >
                  <option value="">Select a category</option>
                  {categoryList.items.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </Box>

              {/* Stock */}
              <Box mb={6}>
                <Text fontWeight="semibold" mb={1}>
                  Stock
                </Text>
                <Input
                  variant="filled"
                  type="number"
                  min="0"
                  value={formData.stock || 1}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stock: parseInt(e.target.value, 10) || 1,
                    })
                  }
                  placeholder="Enter stock quantity"
                />
              </Box>


              {/* ACTION BUTTONS */}
              <Flex justify="space-between">
                <Button
                  colorScheme="red"
                  variant="outline"
                  onClick={handleDelete}
                >
                  <Trash2Icon size={16} style={{ marginRight: '8px' }} />
                  Delete
                </Button>

                <Button
                  colorScheme="blue"
                  type="submit"
                  isDisabled={
                    loadingProducts ||
                    !formData.name ||
                    !formData.price ||
                    !formData.image ||
                    !formData.category_id
                  }
                  onClick={(e) => handleUpdate(e)}
                >
                  {loadingProducts ? (
                    <Spinner size="sm" />
                  ) : (
                    <>
                      <SaveIcon size={16} style={{ marginRight: '8px' }} />
                      Save
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

export default ProductEditPage;
