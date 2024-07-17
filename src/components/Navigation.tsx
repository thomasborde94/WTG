import { Box, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navigation = () => {
  return (
    <Box display="flex" justifyContent="flex-end" paddingRight={3}>
      <Button as={RouterLink} to="/login" colorScheme="blue">
        Login
      </Button>
    </Box>
  );
};

export default Navigation;
