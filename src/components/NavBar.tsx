import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import SearchInput from "./SearchInput";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  return (
    <HStack padding="10px">
      <Text>What's the game ?</Text>
      <Image src={logo} alt="logo WTG" boxSize="200px" objectFit="contain" />
      <SearchInput onSearch={onSearch} />
      <Text>Futur buttons</Text>
    </HStack>
  );
};

export default NavBar;
