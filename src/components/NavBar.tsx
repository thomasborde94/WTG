import { Box, Button, Grid, Heading, Image, Stack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout(); // Appelle la fonction de déconnexion du contexte
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={5} paddingTop={4}>
      <Heading paddingLeft={{ base: 4, sm: 8, md: 10, lg: 20 }}>
        <RouterLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
          What's the game?
        </RouterLink>
      </Heading>
      <Image
        src={logo}
        alt="logo WTG"
        boxSize="200px"
        objectFit="contain"
        mx="auto"
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        paddingRight={{ base: 4, sm: 8, md: 10, lg: 20 }}
      >
        <Stack
          direction={{ base: "column", sm: "row" }} // Vertical alignment on small screens, horizontal on larger screens
          spacing={4}
        >
          {!isLoggedIn ? (
            <>
              <Button as={RouterLink} to="/login" colorScheme="blue">
                Login
              </Button>
              <Button as={RouterLink} to="/create-account" colorScheme="blue">
                Create Account
              </Button>
            </>
          ) : (
            <>
              <Button as={RouterLink} to="/liked-games" colorScheme="blue">
                Liked Games
              </Button>
              <Button colorScheme="blue" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Stack>
      </Box>
    </Grid>
  );
};

export default NavBar;
