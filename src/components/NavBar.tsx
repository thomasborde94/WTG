import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import SearchInput from "./SearchInput";

const NavBar = () => {
  return (
    <HStack padding="10px">
      <Text>What's the game ?</Text>
      <Image src={logo} alt="logo WTG" boxSize="200px" objectFit="contain" />
      <SearchInput />
      <Text>Futur buttons</Text>
    </HStack>
  );
};

export default NavBar;
