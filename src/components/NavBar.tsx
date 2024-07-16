import { Grid, Heading, HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.png";

const NavBar = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={5} paddingTop={4}>
      <Heading>What's the game ?</Heading>
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
