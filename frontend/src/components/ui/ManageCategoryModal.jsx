import { Button, Dialog, Input, Portal } from '@chakra-ui/react'
import React from 'react'

const ManageCategoryModal = () => {
  return (
    <Dialog.Root placement="center">
      <Dialog.Trigger asChild><Button>Manage Categories</Button></Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop/>
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Manage Caregories</Dialog.Title>

              <Dialog.Body>
                <Input></Input>
                
              </Dialog.Body>
            </Dialog.Header>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default ManageCategoryModal