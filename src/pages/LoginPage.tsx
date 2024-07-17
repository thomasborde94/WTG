import { Box, Heading, Input, Button, Stack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const LoginPage = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Stack spacing={4} width="300px">
        <Heading textAlign="center">Login</Heading>
        <Input placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <Button colorScheme="blue">Login</Button>
        <Button as={RouterLink} to="/create-account" colorScheme="blue">
          Create Account
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginPage;
