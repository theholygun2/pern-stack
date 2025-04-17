import { Box, Flex, Button, Text, Spacer, Stack, Span, HStack } from "@chakra-ui/react"
import { Link, useResolvedPath } from "react-router-dom"
import { ColorModeButton } from "./color-mode"
import { useProductStore } from "@/store/useProductStore"
import { ShoppingBagIcon, ShoppingCartIcon } from "lucide-react"

function Navbar() {
  const {pathname} = useResolvedPath()
  const isHomePage = pathname === "/"

  return (
    <Box px={4} py={2}>
      <Box maxW={"7xl"} mx={"auto"}>
        <Flex justify={"space-between"}>
        <HStack>
          <ShoppingCartIcon/>
          <Text>PERN SHOP</Text>
          </HStack>
          <Flex justify={"flex-end"}>
            <HStack>
            <ColorModeButton/>
            {isHomePage && (
              <ShoppingBagIcon/>
            )}
            </HStack>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export default Navbar

