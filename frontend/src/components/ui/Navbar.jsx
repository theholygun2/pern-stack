import {
  Text,
  Box,
  Button,
  Flex,
  HStack,
  Link as ChakraLink,
  Badge,
  Avatar,
  Heading,
  Menu,
  Portal,
  Spacer,
  Popover,
  SimpleGrid
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ColorModeButton } from "./color-mode";
import { ShoppingCartIcon, ShoppingBagIcon, Menu as MenuIcon } from "lucide-react";
import { logoutUser } from "@/services/authService";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";
import { LogOut } from "lucide-react";
import { useProductStore } from "@/store/useProductStore";
import { useEffect } from "react";
import { fetchCategories } from "@/store/productActions";
import { MdOutlineSpaceDashboard } from "react-icons/md";


function Navbar() {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  return (
    <Box position="sticky" top="0" zIndex="sticky" shadow="sm" bg={{_light: "white", _dark: "black"}}>
      <Flex minH={"60px"} justify="space-between" align="center" px={{ base: 6, md: 10 }} py={2} borderBottom="1px solid" borderColor="gray.200" >
        <NavLinks/>
        <RightSideHeader />
      </Flex>
    </Box>
  );
}

const CategoryPopover = () => {
  const { categories } = useProductStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories.length]);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button size="sm" variant="outline">
          Categories
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner
          style={{
            width: "100vw",
            left: 0,
            right: 0, 
            position: "fixed",
            zIndex: 1000,
          }}
        >
          <Popover.Content
            style={{
              width: "100%",
              padding: "1rem",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Popover.Body>
              <Popover.Title fontWeight="medium" mb={4}>
                Categories
              </Popover.Title>
              <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 6 }} spacing={4}>
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant="ghost"
                    size="sm"
                    justifyContent="flex-start"
                    onClick={() => navigate(`/category/${cat.slug}`)}
                  >
                    {cat.name}
                  </Button>
                ))}
              </SimpleGrid>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};


const NavLinks = () => (
  <HStack spacing={6} align="center">
    <ChakraLink as={Link} to="/" _hover={{ textDecoration: "none" }}>
      <Heading size="md" mb="1px">CartLogo</Heading>
    </ChakraLink>
    <Spacer/>
    <ChakraLink as={Link} to="/">
      <Text>All Products</Text>
    </ChakraLink>
    <CategoryPopover/>
  </HStack> 
);

const RightSideHeader = () => {
  const { user } = useUserStore();
  const { cart = [] } = useCartStore();
  const navigate = useNavigate();
  const cartCount = cart.reduce((sum, item) => sum + item.cart_quantity, 0);
  const links = [{title: "Profile", href: "/user/setting",}, {title: "History", href: "/user/history"}] 

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
      {user?.role === "admin" && (
    <Button
      size="sm"
      variant="solid"
      onClick={() => navigate("/admin/dashboard")}
    >
      Admin Dashboard 
      <MdOutlineSpaceDashboard/>
    </Button>
  )}
      <ColorModeButton />
      <ChakraLink as={Link} to="/cart">
      <Box position="relative" mr="4px">
        <ShoppingCartIcon size={26} />
    {/* Show badge only if user is logged in and cartCount > 0 */}
    {user && cartCount > 0 && (
      <Badge
        position="absolute"
        top="-2"
        right="-2"
        bg="red"
        fontSize="0.7em"
        borderRadius="full"
        px={1.5}
        border="1px solid"
        borderColor="white"
        fontWeight="bold"
        color="white"
      >
        {cartCount}
      </Badge>
    )}
  </Box>
</ChakraLink>
      {user ? (
        <>
          <HStack spacing={2} align="center">
            <Text>{user.name}</Text>
            <Menu.Root>
      <Menu.Trigger asChild>
        <Button maxW={0} variant="outline" size="sm">
          <Avatar.Root><Avatar.Image src={user.picture}/></Avatar.Root>
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
        <Menu.Content>
  {links.map((link) => (
    <Menu.Item
      as="a"
      href={link.href}
      key={link.href}
      _hover={{ bg: "gray.300", cursor: "pointer" }}
      _focus={{ bg: "gray.300" }}
      px={3}
      py={2}
      borderRadius="md"
      display="block"
      fontWeight="medium"

    >
      {link.title}
    </Menu.Item>
  ))}
  <Menu.Item
    onClick={handleLogout}
    _hover={{ bg: "gray.300", cursor: "pointer" }}
    _focus={{ bg: "gray.300" }}
    color="red"
    px={3}
    py={2}
    borderRadius="md"
    fontWeight="medium"
  >
    Logout <Menu.ItemCommand><LogOut size="16px"/></Menu.ItemCommand>
  </Menu.Item>
</Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
          </HStack>
        </>
      ) : (
        <Button
    fontSize="sm"
    fontWeight={400}
    variant="solid"
    as="a"
    href="/login"
  >
    Sign in
  </Button>
      )}

    </HStack>
  );
};

export default Navbar;
