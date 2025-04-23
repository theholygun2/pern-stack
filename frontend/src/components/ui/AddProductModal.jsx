import { Button, Dialog, Stack, Input, Fieldset, Portal, Field, Select } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster"
import { useProductStore } from "@/store/useProductStore";

function AddProductModal() {

    const { addProduct, formData, setFormData, loading, categoryList, error } = useProductStore()

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

                                        {categoryList && (
                                            <Select.Root collection={categoryList} 
                                            onValueChange={(key) => {console.log(key); setFormData({...formData, category_id: key.value[0]})} }>
                                            <Select.HiddenSelect />
                                            <Select.Label>Select category</Select.Label>
                                            <Select.Control>
                                                <Select.Trigger>
                                                    <Select.ValueText placeholder="Barang" />
                                                </Select.Trigger>
                                                <Select.IndicatorGroup>
                                                    <Select.Indicator/>
                                                </Select.IndicatorGroup>
                                            </Select.Control>
                                            <Select.Content>
                                                {categoryList.items.map((item) => (
                                                    <Select.Item item={item} key={item.value}>
                                                        {item.label}
                                                    </Select.Item>
                                                ))}
                                            </Select.Content>
                                        </Select.Root>
                                        )}
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
                        <Button onClick={ toaster.promise(addProduct, {
                            success: {
                                id: "upload-success",
                                title: "Succesufully uploaded!",
                                description: "Looks great"
                            },
                            error: {
                                title: "Upload failed",
                                description: "Something went wrong with the upload"
                            }
                        })} isLoading={loading}>
                            Add Product
                        </Button>

                        <Button
      variant="outline"
      size="sm"
      onClick={() => {
        const promise = new Promise<void>((resolve) => {
          setTimeout(() => resolve(), 5000)
        })

        toaster.promise(promise, {
          success: {
            id: "upload-success",
            title: "Successfully uploaded!",
            description: "Looks great",
          },
          error: {
            id: "upload-error",
            title: "Upload failed",
            description: "Something went wrong with the upload",
          },
          loading: {
            id: "upload-loading",
            title: "Uploading...",
            description: "Please wait",
          },
        })
      }}
    >
      Show Toast
    </Button>
                    </Dialog.Footer>

                </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    </Dialog.Root>
  )
}

export default AddProductModal