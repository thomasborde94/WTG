import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.png";

const NavBar = () => {
  return (
    <HStack justifyContent="space-between" padding="10px">
      <Text>What's the game ?</Text>
      <Image src={logo} alt="logo WTG" boxSize="200px" objectFit="contain" />
      <Text>Futur buttons</Text>
    </HStack>
  );
};

export default NavBar;
