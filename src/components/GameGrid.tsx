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

  // Déclaration de l'état local `likedGames` qui stocke un ensemble de noms de jeux likés
  const [likedGames, setLikedGames] = useState<Set<string>>(new Set());

  useEffect(() => {
    // récupère les jeux likés de l'utilisateur depuis l'API
    const fetchLikedGames = async () => {
      try {
        // Requête GET à l'API pour récupérer les jeux likés
        const response = await axios.get(
          "http://localhost:3000/api/liked-games",
          {
            headers: {
              // Inclusion du token pour l'authentification
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (Array.isArray(response.data)) {
          // Extraction des noms des jeux likés
          const likedGameNames = response.data.map(
            (game: { game_name: string }) => game.game_name
          );

          // Mise à jour de l'état `likedGames` avec les noms des jeux likés
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

  // Gère le toggle like/unlike d'un jeu
  const handleLikeToggle = (gameName: string) => {
    setLikedGames((prevLikedGames) => {
      // Crée une copie de l'ensemble `likedGames`
      const updatedLikedGames = new Set(prevLikedGames);

      // Ajoute ou supprime le jeu de l'ensemble en fonction de son état actuel
      if (updatedLikedGames.has(gameName)) {
        updatedLikedGames.delete(gameName); // Supprime si déjà liké
      } else {
        updatedLikedGames.add(gameName); // Ajoute si pas encore liké
      }
      // Retourne le nouvel ensemble mis à jour
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
