import { Box, Heading, Input, Button, Stack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const CreateAccountPage = () => {
  return (
    <Box display="flex" justifyContent="center" minHeight="100vh">
      <Stack spacing={4} width="300px">
        <Heading textAlign="center">Create Account</Heading>
        <Input placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
        <Button colorScheme="blue" width="100%">
          Create Account
        </Button>
        <Button
          as={RouterLink}
          to="/login"
          colorScheme="blue"
          variant="link"
          width="100%"
        >
          Already have an account ? Login
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateAccountPage;
