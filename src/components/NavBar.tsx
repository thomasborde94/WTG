// src/components/NavBar.tsx
import { Box, Button, Grid, Heading, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.png";
import Navigation from "./Navigation";

const NavBar = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={5} paddingTop={4}>
      <Heading paddingLeft={3}>
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
      <Navigation />
    </Grid>
  );
};

export default NavBar;
