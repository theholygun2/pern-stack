import { Button, Dialog, Stack, Input, Fieldset, Portal, Field, Select } from "@chakra-ui/react";
import { useProductStore } from "@/store/useProductStore";
import { useEffect } from "react";

function AddProductModal() {

    const { addProduct, formData, setFormData, loading, categories, error } = useProductStore()

  return (
    <Dialog.Root placement="center">
        <Dialog.Trigger asChild>
            <Button variant="outline">Add Product</Button>
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

                                        <Field.Root>
                                            <Field.Label>Category</Field.Label>
                                            <Select.Root placeholder="Select category" value={formData.category_id} onChange={(e) => setFormData({ ...formData, category_id: e.target.value })} >
                                                {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                                ))}
                                            </Select.Root>
                                            </Field.Root>
                                    </Stack>
                                </Fieldset.Content>
                            </Fieldset.Root>
                        </form>
                    </Dialog.Body>

                    <Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <Button variant="ghost" mr="3">
                                Cancel
                            </Button>
                        </Dialog.CloseTrigger>
                        <Button onClick={addProduct} isLoading={loading}>
                            Add Product
                        </Button>
                    </Dialog.Footer>

                </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    </Dialog.Root>
  )
}

export default AddProductModal