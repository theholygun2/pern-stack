import { Box, Flex, Button, Text, Spacer, Stack, Span, HStack, Link as ChakraLink } from "@chakra-ui/react"
import { Link, useLocation, useResolvedPath } from "react-router-dom"
import { ColorModeButton } from "./color-mode"
import { ShoppingBagIcon, ShoppingCartIcon } from "lucide-react"

function Navbar() {
  const {pathname} = useLocation()
  const isHomePage = pathname === "/"

  return (
    <Box>
      <Flex justify="space-between" align="center" px={4} py={2} minH="60px" borderBottom={1} borderStyle="solid">
        <Flex>
          <ShoppingCartIcon />
          Clothes Shop
          Best Sellers
          Shop All
          Collaborations
          Accessories
          Sale
          Lookbooks
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

