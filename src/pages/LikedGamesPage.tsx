import { useEffect, useState } from "react";
import { Box, Heading, Stack, Button, Text, useToast } from "@chakra-ui/react";
import StoreLink from "../components/StoreLink";
import { Game } from "../hooks/useGames";

interface LikedGame {
  id: number;
  game_name: string;
  genre: string;
}

const LikedGamesPage = () => {
  const [likedGames, setLikedGames] = useState<LikedGame[]>([]);
  const toast = useToast();

  useEffect(() => {
    const fetchLikedGames = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/liked-games", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        setLikedGames(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLikedGames();
  }, []);

  const handleUnlike = async (gameName: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/liked-games/${gameName}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        setLikedGames((prevGames) =>
          prevGames.filter((game) => game.game_name !== gameName)
        );
        toast({
          title: "Game unliked",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.error || "An error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An error occurred while unliking the game.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box display="flex" justifyContent="center" minHeight="100vh">
      <Stack spacing={4} width="400px">
        <Heading textAlign="center">Liked Games</Heading>
        {likedGames.length > 0 ? (
          likedGames.map((game) => (
            <Box
              key={game.id}
              p={4}
              borderWidth={1}
              borderRadius={5}
              boxShadow="md"
              backgroundColor="white"
            >
              <Text fontSize="lg" fontWeight="bold" color={"black"}>
                {game.game_name}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Genre: {game.genre}
              </Text>
              <Button
                colorScheme="red"
                size="sm"
                mt={2}
                onClick={() => handleUnlike(game.game_name)}
              >
                Unlike
              </Button>
              <StoreLink gameId={game.id.toString()} />
            </Box>
          ))
        ) : (
          <Text textAlign="center">No liked games found.</Text>
        )}
      </Stack>
    </Box>
  );
};

export default LikedGamesPage;
