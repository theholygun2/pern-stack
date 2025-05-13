import { Text, Box, Button, Flex, HStack, Link as ChakraLink, Popover, Stack } from "@chakra-ui/react"
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
            <ColorModeButton />
          <Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'fsdf'}>
            Sign In
          </Button>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            href={'#'}
            _hover={{
              bg: 'pink.300',
            }}>
            Subscribe
          </Button>
            <ChakraLink as={Link} to="/cart"><ShoppingCartIcon/></ChakraLink>
            </HStack>
      </Flex>
    </Box>
        
  )
}

const RightSideHeader = () => {
  return (
    <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <ColorModeButton />
          <Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'#'}>
            Sign In
          </Button>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            href={'#'}
            _hover={{
              bg: 'pink.300',
            }}>
            Subscribe
          </Button>
        </Stack>
  )
}

export default Navbar
