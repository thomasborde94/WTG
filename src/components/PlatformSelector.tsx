import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import usePlatform from "../hooks/usePlatform";

const PlatformSelector = () => {
  const { data, error } = usePlatform();

  if (error) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Platform
      </MenuButton>
      <MenuList minWidth="400px">
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
          {data.map((platform) => (
            <GridItem key={platform.id}>
              <MenuItem>{platform.name}</MenuItem>
            </GridItem>
          ))}
        </Grid>
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;
