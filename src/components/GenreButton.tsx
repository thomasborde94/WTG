import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
  Text,
  Spinner,
  Grid,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useGenres, { Genre } from "../hooks/useGenres";

interface Props {
  onSelectGenre: (genre: Genre) => void;
}

const GenreButton: React.FC<Props> = ({ onSelectGenre }) => {
  const { data, error, isLoading } = useGenres();
  const [selectedGenre, setSelectedGenre] = useState("Genre");

  const handleGenreSelect = (genre: Genre) => {
    setSelectedGenre(genre.name);
    onSelectGenre(genre); // Call the parent function with the selected genre
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {selectedGenre}
      </MenuButton>
      <MenuList minWidth="400px">
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
          {isLoading && (
            <Box padding="12px">
              <Spinner />
            </Box>
          )}
          {error && (
            <Box padding="12px">
              <Text>{error}</Text>
            </Box>
          )}
          {!isLoading && !error && (
            <>
              {data.map((genre) => (
                <MenuItem
                  key={genre.id}
                  onClick={() => handleGenreSelect(genre)}
                >
                  {genre.name}
                </MenuItem>
              ))}
            </>
          )}
        </Grid>
      </MenuList>
    </Menu>
  );
};

export default GenreButton;
