import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames, { Platform } from "../hooks/useGames";
import GameCard from "./GameCard";
import { Genre } from "../hooks/useGenres";
//import GameCardSkeleton from "./GameCardSkeleton";

interface Props {
  selectedGenre: Genre | null;
  selectedPlatform: Platform | null;
}

const GameGrid = ({ selectedGenre, selectedPlatform }: Props) => {
  // Gets the data from the useGames hook, that fetches the games with the selected genre
  const { data, error, isLoading } = useGames(selectedGenre, selectedPlatform);
  //const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3 }}
        padding="10px"
        spacing={{ base: 2, sm: 2, md: 3, lg: 4 }}
        justifyContent="center"
      >
        {/* {isLoading &&
          skeletons.map((skeleton) => <GameCardSkeleton key={skeleton} />)} */}
        {data.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
