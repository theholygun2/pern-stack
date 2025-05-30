import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'

const Footer = () => {
  const footerSections = [
    {
      title: "Products",
      links: ["Kocak", "Ngakak", "Ketawa"]
    },
    {
      title: "About",
      links: ["Instagram", "Twitter", "Linkedin"]
    },
    {
      title: "Resources",
      links: ["Blog", "Docs", "Support"]
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "License"]
    }
  ];
  
  return (
    <Box mt="auto" bg={{_light: "gray.900", _dark: "white"}} color={{_light: "white", _dark: "black"}}>
        <Container maxW="6xl" py={10}>
        <Flex direction={{ base: "column", md: "row" }} justify={{ base: "center", md: "space-between" }} gap={{ base: 8, md: 16 }}>
  {footerSections.map((section, idx) => (
    <VStack key={idx} align="flex-start" minW="150px">
      <Heading size="md">{section.title}</Heading>
      {section.links.map((link, i) => (
        <Text key={i}>{link}</Text>
      ))}
    </VStack>
  ))}
</Flex>
        </Container>
        <Center py="20px">
          <Heading>gas</Heading>
        </Center>
    </Box>
  )
}

export default Footer