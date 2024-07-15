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
  selectedGenre: Genre | null;
  onSelectGenre: (genre: Genre) => void;
}

const GenreButton = ({ selectedGenre, onSelectGenre }: Props) => {
  const { data, error, isLoading } = useGenres();

  if (error) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {selectedGenre?.name || "Genre"}
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
                <MenuItem key={genre.id} onClick={() => onSelectGenre(genre)}>
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
