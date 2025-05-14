import { Text, Box, Button, Flex, HStack, Link as ChakraLink, Popover, Stack, Avatar } from "@chakra-ui/react"
import { Link, useLocation, useResolvedPath } from "react-router-dom"
import { ColorModeButton } from "./color-mode"
import { ShoppingBagIcon, ShoppingCartIcon } from "lucide-react"
import { useRef, useState } from "react"
import { useProductStore } from "@/store/useProductStore"
import { logoutUser } from "@/services/authService"

function Navbar() {
  const {pathname} = useLocation()
  const isHomePage = pathname === "/"
  const [open, setOpen ] = useState(false)

  return (
    <Box position="sticky" top="0" zIndex="sticky" bg={{ base: "white", _dark: "black" }}>
      <Flex justify="space-between" align="center" px={4} py={2} minH="60px" borderBottom={1} shadow={"sm"}>
        <Flex gap="4" align="center">
          <ShoppingCartIcon />
          <ChakraLink as={Link} to="/"><Text>All Products</Text></ChakraLink>
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
        </Flex>
        <RightSideHeader/>
      </Flex>
    </Box>
        
  )
}

const RightSideHeader = () => {
  const { user } = useProductStore();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <HStack>
      <ColorModeButton />
      {user ? (
        <>
          <Box>
            <Text>{user?.name}</Text>
            <Avatar.Root>
              <Avatar.Fallback name={user?.name} />
              <Avatar.Image src={user?.picture} />
            </Avatar.Root>
          </Box>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      ) : (
        <Button
          fontSize="sm"
          fontWeight={400}
          variant="solid"
          as="a"
          href="http://localhost:3000/auth/google"
        >
          Sign in
        </Button>
      )}
      <ChakraLink as={Link} to="/cart">
        <ShoppingCartIcon />
      </ChakraLink>
    </HStack>
  );
};


export default Navbar
