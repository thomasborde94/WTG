import { Box, Button, Grid, Heading, Image } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext"; // Importation du hook

const NavBar = () => {
  const { isLoggedIn, logout } = useAuth(); // Utilisation du hook

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
        {!isLoggedIn ? (
          <>
            <Button
              as={RouterLink}
              to="/login"
              colorScheme="blue"
              marginRight={4}
            >
              Login
            </Button>
            <Button as={RouterLink} to="/create-account" colorScheme="blue">
              Create Account
            </Button>
          </>
        ) : (
          <Button colorScheme="blue" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Box>
    </Grid>
  );
};

export default NavBar;
