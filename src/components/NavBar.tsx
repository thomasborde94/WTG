import { Grid, Heading, HStack, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const NavBar = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={5} paddingTop={4}>
      <Heading paddingLeft={3}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          What's the game?
        </Link>
      </Heading>
      <Image
        src={logo}
        alt="logo WTG"
        boxSize="200px"
        objectFit="contain"
        mx="auto"
      />
      <Heading>Futur buttons</Heading>
    </Grid>
  );
};

export default NavBar;
