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
} from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import { ChevronDownIcon } from "@chakra-ui/icons";

const GenreButton = () => {
  const { data, error, isLoading } = useGenres();
  return (
    <>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Button rightIcon={<ChevronDownIcon />}>Genre</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            {isLoading && <Text>Loading...</Text>}
            {error && <Text>{error}</Text>}
            {!isLoading && !error && (
              <Box>
                {data.map((genre) => (
                  <Text key={genre.id}>{genre.name}</Text>
                ))}
              </Box>
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default GenreButton;
