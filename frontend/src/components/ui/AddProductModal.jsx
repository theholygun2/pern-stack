import { Button, Box, Dialog, Float, Stack, Input, InputGroup, Fieldset, Portal, Field, Select, FileUpload, useFileUploadContext, Icon } from "@chakra-ui/react";
import { useProductStore } from "@/store/useProductStore";
import { addProduct } from "@/store/productActions";
import { NumericFormat } from "react-number-format";
import { LuFileImage, LuX, LuUpload } from "react-icons/lu"
import { useEffect } from "react";
import ImageUploader from "./ImageUploader";

function AddProductModal() {

    const { formData, setFormData, resetForm, loadingProducts, categoryList } = useProductStore();
    
    const isFormValid = () => {
        const { name, price, image, category_id, stock } = formData;
        return (
          name.trim() !== "" &&
          price.trim() !== "" &&
          image.trim() !== "" &&
          category_id !== "" &&
          stock > 0
        );
      };
      
  return (
    <Dialog.Root placement="center" >
        <Dialog.Trigger asChild>
        <Button onClick={() => {
      resetForm(); 
    }}>
      Add Product
    </Button>
        </Dialog.Trigger>
        <Portal>
            <Dialog.Backdrop/>
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>
                            Add new Product
                        </Dialog.Title>
                    </Dialog.Header>

                    <Dialog.Body>
                            <Fieldset.Root>
                                <Fieldset.Legend>
                                    Product Details
                                </Fieldset.Legend>
                                <Fieldset.Content>
                                    <Stack spacing="4">

                                      {/* product name */}
                                        <Field.Root>
                                            <Field.Label>Name</Field.Label>
                                            <Input  type="text" placeholder="Product name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                                        </Field.Root>

                                        {/* Price */}

                                        <Field.Root>
                                          <Field.Label>Price</Field.Label>
                                          <InputGroup startElement="RP." endElement="IDR">
                                          <NumericFormat
                                            customInput={Input}
                                            thousandSeparator="."
                                            decimalSeparator=","
                                            allowNegative={false}
                                            allowLeadingZeros={false}
                                            value={formData.price}
                                            onValueChange={(values) => {
                                              setFormData({ ...formData, price: values.value }); // this gives raw number
                                            }}
                                            placeholder="0"
                                            inputMode="numeric"
                                            autoComplete="off"
                                            onKeyDown={(e) => {
                                              if (e.key === ".") {
                                                e.preventDefault(); // prevent entering period
                                              }
                                            }}
                                          />
                                          </InputGroup>
                                        </Field.Root>

                                        {/* Image Url */}
                                        <Field.Root>
                                            <Field.Label>Image URL</Field.Label>
                                            {/* <Input type="text" placeholder="https://example.com/image.jpg" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})}/> */}
                                            
                                        </Field.Root>



                                        {/* categories drop down */}
                                        {categoryList && (
                                            <Select.Root
                                            collection={categoryList}
                                            onValueChange={(key) => {
                                              const selectedId = key.value[0];
                                              setFormData({ ...formData, category_id: selectedId });
                                            }}
                                          >
                                            <Select.HiddenSelect />
                                            <Select.Label>Select category</Select.Label>
                                            <Select.Control>
                                              <Select.Trigger>
                                                <Select.ValueText placeholder="Select a category" />
                                              </Select.Trigger>
                                              <Select.IndicatorGroup>
                                                <Select.Indicator />
                                              </Select.IndicatorGroup>
                                            </Select.Control>
                                            <Select.Positioner>
                                            <Select.Content>
                                              {categoryList.items.map((item) => (
                                                <Select.Item item={item} key={item.value}>
                                                  {item.label}
                                                </Select.Item>
                                              ))}
                                            </Select.Content>
                                            </Select.Positioner>
                                          </Select.Root>                                          
                                        )}

                                        <Field.Root>
                                          <Field.Label>Stock</Field.Label>
                                          <Input
                                            type="number"
                                            min="1"
                                            placeholder="1"
                                            value={formData.stock || 1}  // Default value of 1 if formData.quantity is falsy (undefined or null)
                                            onChange={(e) =>
                                              setFormData({ ...formData, stock: parseInt(e.target.value, 10) || 1 }) // Fallback to 1 if input is not a number
                                            }
                                          />
                                        </Field.Root>

                                    </Stack>
                                </Fieldset.Content>
                            </Fieldset.Root>
                    </Dialog.Body>

                    <Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <Button>
                                Cancel
                            </Button>
                        </Dialog.CloseTrigger>
                        <Button onClick={addProduct} isLoading={loadingProducts} disabled={!isFormValid()}>
                            Upload Product
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    </Dialog.Root>
  )
}

export default AddProductModal