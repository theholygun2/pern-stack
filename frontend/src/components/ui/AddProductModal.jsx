import { Button, Dialog, Stack, Input, Fieldset, Portal, Field, Select } from "@chakra-ui/react";
import { useProductStore } from "@/store/useProductStore";
import { addProduct } from "@/store/productActions";
import { useState, useEffect } from "react";

function AddProductModal() {

    const { formData, setFormData, resetForm, loadingProducts, categoryList } = useProductStore()
    const isFormValid = () => {
        const { name, price, image, category_id } = formData;
        return (
          name.trim() !== "" &&
          price.trim() !== "" &&
          image.trim() !== "" &&
          category_id !== ""
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
                        <form>
                            <Fieldset.Root>
                                <Fieldset.Legend>
                                    Product Details
                                </Fieldset.Legend>
                                <Fieldset.Content>
                                    <Stack spacing="4">
                                        <Field.Root>
                                            <Field.Label>Name</Field.Label>
                                            <Input type="text" placeholder="Product name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                                        </Field.Root>

                                        <Field.Root>
                                            <Field.Label>Price</Field.Label>
                                            <Input          
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            placeholder="0.00"
                                            value={formData.price}
                                            onChange={(e) => setFormData({...formData, price: e.target.value})}/>
                                        </Field.Root>

                                        <Field.Root>
                                            <Field.Label>Image URL</Field.Label>
                                            <Input type="text" placeholder="https://example.com/image.jpg" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})}/>
                                        </Field.Root>

                                        {categoryList && (
                                            <Select.Root
                                            collection={categoryList}
                                            onValueChange={(key) => {
                                              const selectedId = key.value[0];
                                              console.log(selectedId);
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
                                    </Stack>
                                </Fieldset.Content>
                            </Fieldset.Root>
                        </form>
                    </Dialog.Body>

                    <Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <Button>
                                Cancel
                            </Button>
                        </Dialog.CloseTrigger>
                        <Button onClick={addProduct}isLoading={loadingProducts} disabled={!isFormValid()}>
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