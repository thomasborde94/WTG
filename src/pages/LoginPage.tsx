import { Box, Heading, Input, Button, Stack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const LoginPage = () => {
  return (
    <Box display="flex" justifyContent="center" minHeight="100vh">
      <Stack spacing={4} width="300px">
        <Heading textAlign="center">Login</Heading>
        <Input placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <Button colorScheme="blue" width="100%">
          Login
        </Button>
        <Button
          as={RouterLink}
          to="/create-account"
          colorScheme="blue"
          variant="link"
          width="100%"
        >
          Create Account
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginPage;
