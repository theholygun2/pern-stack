import { Text, Box, Button, Flex, HStack, Link as ChakraLink, Popover, Stack, Avatar } from "@chakra-ui/react"
import { Link, useLocation, useNavigate, useResolvedPath } from "react-router-dom"
import { ColorModeButton } from "./color-mode"
import { ShoppingBagIcon, ShoppingCartIcon } from "lucide-react"
import { logoutUser } from "@/services/authService"
import { useCartStore } from "@/store/useCartStore"
import { useUserStore } from "@/store/useUserStore"

function Navbar() {
  const {pathname} = useLocation()
  const isHomePage = pathname === "/"

  return (
    <Box position="sticky" top="0" zIndex="sticky" bg={{ base: "white", _dark: "black" }}>
      <Flex justify="space-between" align="center" px={4} py={2} minH="60px" borderBottom={1} shadow={"sm"}>
        <Flex gap="4" align="center">
          <ShoppingCartIcon />
          <ChakraLink as={Link} to="/"><Text>All Products</Text></ChakraLink>
          <Text>Categories</Text>
        </Flex>
        <RightSideHeader/>
      </Flex>
    </Box>       
  )
}

const RightSideHeader = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await logoutUser(); // backend call
    useUserStore.getState().setUser(null); // local state reset
    useCartStore.getState().setCart([]);
    
    navigate("/")
  } catch (err) {
    console.error("Logout failed", err);
  }
};

  return (
    <HStack spacing={4} align="center">
  <ColorModeButton />

  {user ? (
    <>
      <HStack spacing={2} align="center">
        <Text>{user.name}</Text>
        <Avatar.Root>
          <Avatar.Fallback name={user.name} />
          <Avatar.Image src={user.picture} />
        </Avatar.Root>
      </HStack>

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
