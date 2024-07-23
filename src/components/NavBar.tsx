// src/components/NavBar.tsx
import { Box, Button, Grid, Heading, Image } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Navigation from "./Navigation";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking the presence of the token
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []); // Run only once on mount

  const handleLogout = () => {
    // Clear the token from localStorage and update the state
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home page
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
