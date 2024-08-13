import {
  Box,
  Heading,
  Stack,
  Button,
  Text,
  useToast,
  Flex,
} from "@chakra-ui/react";
import StoreLink from "../components/StoreLink";
import { useLikedGames } from "../context/LikedGamesContext";

const LikedGamesPage = () => {
  const { likedGames, removeLikedGame } = useLikedGames(); // Récupération des jeux likés et des méthodes associées
  const toast = useToast();

  // Fonction pour gérer l'action d'unlike d'un jeu
  const handleUnlike = async (gameName: string) => {
    try {
      // Requête à l'API pour supprimer un jeu des jeux likés
      const response = await fetch(
        `http://localhost:3000/api/liked-games/${encodeURIComponent(gameName)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Vérification si la requête a réussi
      if (response.ok) {
        removeLikedGame(gameName); // Mise à jour du contexte pour supprimer le jeu
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
              backgroundColor="#171d50"
            >
              <Text fontSize="lg" fontWeight="bold" color={"white"}>
                {game.gameName}
              </Text>
              <Text fontSize="sm" color="white">
                Genre: {game.genre}
              </Text>

              <Flex mt={2} justifyContent="space-between">
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleUnlike(game.gameName)}
                >
                  Unlike
                </Button>
                <StoreLink gameId={game.id.toString()} />
              </Flex>
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
