import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames, { Platform } from "../hooks/useGames";
import GameCard from "./GameCard";
import { Genre } from "../hooks/useGenres";
import { GameQuery } from "../App";
import { useState, useEffect } from "react";
import axios from "axios";

interface Props {
  gameQuery: GameQuery;
}

const GameGrid = ({ gameQuery }: Props) => {
  const { data, error, isLoading } = useGames(gameQuery);
  const [likedGames, setLikedGames] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchLikedGames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/liked-games",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Vérifiez si la réponse est un tableau et loggez-la pour vérification
        console.log("Response data:", response.data);

        if (Array.isArray(response.data)) {
          const likedGameNames = response.data.map(
            (game: { game_name: string }) => game.game_name
          );

          // Debugging output
          console.log("Extracted liked game names:", likedGameNames);

          setLikedGames(new Set(likedGameNames));
        } else {
          console.error("Response is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching liked games:", error);
      }
    };

    fetchLikedGames();
  }, []);

  const handleLikeToggle = (gameName: string) => {
    setLikedGames((prevLikedGames) => {
      const updatedLikedGames = new Set(prevLikedGames);
      if (updatedLikedGames.has(gameName)) {
        updatedLikedGames.delete(gameName);
      } else {
        updatedLikedGames.add(gameName);
      }
      return updatedLikedGames;
    });
  };

  if (error) return <Text>{error}</Text>;

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 4 }}
      padding="10px"
      spacing={{ base: 2, sm: 2, md: 3, lg: 4 }}
      justifyContent="center"
    >
      {data.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          isLiked={likedGames.has(game.name)}
          onLikeToggle={handleLikeToggle}
        />
      ))}
    </SimpleGrid>
  );
};

export default GameGrid;
