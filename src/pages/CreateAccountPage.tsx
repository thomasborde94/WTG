import { Box, Heading, Input, Button, Stack } from "@chakra-ui/react";

const CreateAccountPage = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Stack spacing={4} width="300px">
        <Heading textAlign="center">Create Account</Heading>
        <Input placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
        <Button colorScheme="blue">Create Account</Button>
      </Stack>
    </Box>
  );
};

export default CreateAccountPage;
