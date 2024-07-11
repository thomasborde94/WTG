import React, { useState } from "react";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Box,
  Text,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useGenres, { Genre } from "../hooks/useGenres";

// Correctly define the Props interface
interface Props {
  onSelectGenre: (genre: Genre) => void;
}

const GenreButton: React.FC<Props> = ({ onSelectGenre }) => {
  const { data, error, isLoading } = useGenres();
  const [selectedGenre, setSelectedGenre] = useState("Genre");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleGenreSelect = (genre: Genre) => {
    setSelectedGenre(genre.name);
    onSelectGenre(genre); // Call the parent function with the selected genre
    onClose(); // closes the panel automatically when selecting genre
  };

  return (
    <Popover
      placement="bottom-start"
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
    >
      <PopoverTrigger>
        <Button rightIcon={<ChevronDownIcon />} onClick={onOpen}>
          {selectedGenre}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          {isLoading && <Spinner />}
          {error && <Text>{error}</Text>}
          {!isLoading && !error && (
            <Box>
              {data.map((genre) => (
                <Button
                  key={genre.id}
                  margin={1}
                  onClick={() => handleGenreSelect(genre)}
                  _hover={{ color: "blue.500" }}
                >
                  {genre.name}
                </Button>
              ))}
            </Box>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default GenreButton;
