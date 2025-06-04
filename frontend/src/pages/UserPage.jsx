import Navbar from "@/components/ui/Navbar";
import { useUserStore } from "@/store/useUserStore";
import { Box, Heading, Input, Center, Flex, Stack, Image, Button, Text, Tabs } from "@chakra-ui/react";
import { DataList } from "@chakra-ui/react"

const Demo = () => {
  return (
    <DataList.Root orientation="horizontal" divideY="1px" maxW="md">
      {items.map((item) => (
        <DataList.Item key={item.label} pt="4">
          <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
          <DataList.ItemValue>{item.value}</DataList.ItemValue>
        </DataList.Item>
      ))}
    </DataList.Root>
  )
}

const items = [
  { label: "First Name", value: "Jassie" },
  { label: "Last Name", value: "Bhatia" },
  { label: "Email", value: "jassie@jassie.dev" },
  { label: "Phone", value: "1234567890" },
  { label: "Address", value: "1234 Main St, Anytown, USA" },
]


  const UserPage = () => {
    const { user } = useUserStore(); // assume user has: name, email, picture


    function profileForm() {
        return (
            <Flex
            boxShadow="md"
            borderRadius="lg"
            p={8}
            gap={8}
            width="full"
            maxW="4xl"
            align="start"
            >
         {/* Left: Avatar + Upload Button */}
         <Stack align="center" spacing={4}>
          <Image
            src={user?.picture}
            alt="Profile"
            boxSize="150px"
            borderRadius="full"
            objectFit="cover"
          />
          <Button size="sm">
            Pilih Foto
          </Button>
          <Text fontSize="xs" textAlign="center">
            Maksimal 10MB. JPG, JPEG, PNG.
          </Text>
        </Stack>

         {/* Right: Form Fields */}
         <Box flex="1">
          <Heading size="md" mb={4}>
            Ubah Biodata Diri
          </Heading>
          <Stack spacing={4}>
            <Box>
              <Text fontWeight="medium">Nama</Text>
              <Input defaultValue={user?.name} />
            </Box>
            <Box>
              <Text fontWeight="medium">Email</Text>
              <Input defaultValue={user?.email} />
            </Box>
            <Box>
              <Text fontWeight="medium">Alamat</Text>
              <Input placeholder="Tambahkan alamat" />
            </Box>
            <Button colorScheme="green">Simpan</Button>
          </Stack>
        </Box>
      </Flex>
        )
    }

    function addressForm(){
        return(
            <>
            ADDRESS TABLE HERE MAN
            </>
        )
    }

    return (
        <>
        <Navbar/>
        <Center minH="100vh">
            <Box w="full" maxW="xl">
                <Tabs.Root defaultValue="profile">
                {/* "line", "subtle", "enclosed", "outline", "plain"  */}
                    <Tabs.List>
                        <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
                        <Tabs.Trigger value="address">Address</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="profile">{profileForm()}</Tabs.Content>
                    <Tabs.Content value="address">Manage your tasks for freelancers</Tabs.Content>
                </Tabs.Root>
                
            </Box>
            
        </Center>
        </>
    );
  };
  
  export default UserPage;
  