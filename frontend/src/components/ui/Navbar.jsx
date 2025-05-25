import {
  Text,
  Box,
  Button,
  Flex,
  HStack,
  Link as ChakraLink,
  Badge,
  Avatar,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ColorModeButton } from "./color-mode";
import { ShoppingCartIcon, ShoppingBagIcon } from "lucide-react";
import { logoutUser } from "@/services/authService";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";

function Navbar() {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  return (
    <Box position="sticky" top="0" zIndex="sticky" shadow="sm">
      <Flex justify="space-between" align="center" px={4} py={2} borderBottom="1px solid" borderColor="gray.200">
        <NavLinks />
        <RightSideHeader />
      </Flex>
    </Box>
  );
}

const NavLinks = () => (
  <HStack spacing={4} align="center">
    <ShoppingBagIcon size={20} />
    <ChakraLink as={Link} to="/">
      <Text>All Products</Text>
    </ChakraLink>
    <Text>Categories</Text> {/* You can replace this with dynamic links later */}
  </HStack>
);

const RightSideHeader = () => {
  const { user } = useUserStore();
  const { cart = [] } = useCartStore();
  const navigate = useNavigate();
  const cartCount = cart.reduce((sum, item) => sum + item.cart_quantity, 0);

  const handleLogout = async () => {
    try {
      await logoutUser();
      useUserStore.getState().setUser(null);
      useCartStore.getState().setCart([]);
      navigate("/");
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
          <Button onClick={handleLogout} size="sm">
            Logout
          </Button>
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
  <Box position="relative">
    <ShoppingCartIcon size={24} />
    
    {/* Show badge only if user is logged in and cartCount > 0 */}
    {user && cartCount > 0 && (
      <Badge
        position="absolute"
        top="-1"
        right="-1"
        bg="red.500"
        color="white"
        fontSize="0.7em"
        borderRadius="full"
        px={2}
      >
        {cartCount}
      </Badge>
    )}
  </Box>
</ChakraLink>

    </HStack>
  );
};

export default Navbar;
