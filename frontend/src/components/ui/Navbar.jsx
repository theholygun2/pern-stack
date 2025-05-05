import { Text, Box, Flex, HStack, Link as ChakraLink, Select, Popover, Portal, SelectClearTrigger } from "@chakra-ui/react"
import { Link, useLocation, useResolvedPath } from "react-router-dom"
import { ColorModeButton } from "./color-mode"
import { ShoppingBagIcon, ShoppingCartIcon } from "lucide-react"
import { useState } from "react"

function Navbar() {
  const {pathname} = useLocation()
  const isHomePage = pathname === "/"
  const [open, setOpen ] = useState(false)

  return (
    <Box>
      <Flex justify="space-between" align="center" px={4} py={2} minH="60px" borderBottom={1} borderStyle="solid">
        <Flex gap="4">
          <ShoppingCartIcon />
          <ChakraLink as={Link} _><Text>Best Sellers</Text></ChakraLink>
          <Popover.Root trigger={'hover'} open={open} onOpenChange={(e) => setOpen(e.open)} asChild>
            <Popover.Trigger onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
              Shop All
            </Popover.Trigger>
            <Portal>
              <Popover.Positioner>
                <Popover.Content onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                  <Popover.Body>
                    WADIDAWWWW
                  </Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover.Root>
          <Text>Shop All</Text>
          <Text>Collaborations</Text>
          <Text>Accessories</Text>
          <Text>Sale</Text>
          <Text>Lookbooks</Text>
        </Flex>
        <HStack>
            <ColorModeButton/>
            {isHomePage && (
              <ShoppingBagIcon/>
            )}
            </HStack>
      </Flex>
    </Box>
        
  )
}

export default Navbar
