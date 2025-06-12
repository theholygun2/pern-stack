import { Center, Box, Heading, Input, Button, Fieldset, Stack, Field} from '@chakra-ui/react'
import React, { useState } from 'react'

const AdminLoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    if (!username || !password) {
      alert('Please fill in all fields')
      return
    }

    // Send to backend
    console.log('Login:', { username, password })
  }

  return (
    <Center height="100vh" bg="gray.50">
      <Box 
        p={6} 
        borderRadius="md" 
        boxShadow="md" 
        bg="white" 
        width="100%" 
        maxW="sm"
      >
        <Heading mb={4} size="lg" textAlign="center">Admin Login</Heading>
        <Fieldset.Root size="lg" maxW="md">
      <Stack>
        <Fieldset.Legend>Contact details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your contact details below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>
        <Field.Root>
  <Field.Label>Username</Field.Label>
  <Input
    name="username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
</Field.Root>

<Field.Root>
  <Field.Label>Password</Field.Label>
  <Input
    name="password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
</Field.Root>

      </Fieldset.Content>

      <Button colorScheme="blue" width="100%" onClick={handleLogin}>
          Login
        </Button>
    </Fieldset.Root>
        
      </Box>
    </Center>
  )
}

export default AdminLoginPage
