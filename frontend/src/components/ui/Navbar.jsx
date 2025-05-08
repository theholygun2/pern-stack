import { Text, Box, Flex, HStack, Link as ChakraLink, Select, Popover, Portal, VStack, SimpleGrid } from "@chakra-ui/react"
import { Link, useLocation, useResolvedPath } from "react-router-dom"
import { ColorModeButton } from "./color-mode"
import { ShoppingBagIcon, ShoppingCartIcon } from "lucide-react"
import { useRef, useState } from "react"

function Navbar() {
  const {pathname} = useLocation()
  const isHomePage = pathname === "/"
  const [open, setOpen ] = useState(false)

  return (
    <Box position="sticky" top="0" zIndex="sticky" bg={{ base: "white", _dark: "black" }}>
      <Flex justify="space-between" align="center" px={4} py={2} minH="60px" borderBottom={1} shadow={"sm"}>
        <Flex gap="4" align="center">
          <ShoppingCartIcon />
          <ChakraLink as={Link} to="/"><Text>Best Sellers</Text></ChakraLink>
            <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
              <Popover.Trigger onMouseEnter={() => setOpen(true)}>
                <Box>
                Hover Me
                </Box>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content >
                  Im Clicked breh
                </Popover.Content>
              </Popover.Positioner>
            </Popover.Root>

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
