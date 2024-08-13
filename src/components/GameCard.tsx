import { Game } from "../hooks/useGames";
import {
  Card,
  CardBody,
  Flex,
  Image,
  Text,
  Box,
  HStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import getCroppedImageUrl from "../services/image-url";
import StoreLink from "./StoreLink";
import { useState } from "react";

interface Props {
  game: Game;
  isLiked: boolean;
  onLikeToggle: (gameName: string) => void;
}

const GameCard = ({ game, isLiked, onLikeToggle }: Props) => {
  const [liked, setLiked] = useState(isLiked);
  const toast = useToast();

  const handleLike = async () => {
    try {
      // Détermine l'URL de l'API en fonction de l'état `liked`
      const url = liked
        ? `http://localhost:3000/api/liked-games/${encodeURIComponent(
            game.name
          )}`
        : "http://localhost:3000/api/liked-games";

      // Envoie une requête API pour liker ou unliker le jeu
      const response = await fetch(url, {
        method: liked ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ajoute le token JWT pour l'authentification
        },
        body: liked
          ? null // Pas de body pour DELETE
          : JSON.stringify({
              gameName: game.name, // Envoie le nom du jeu
              genre: game.genres[0]?.name, // Envoie le genre du jeu
            }),
      });

      // Si la requête est réussie
      if (response.ok) {
        const data = await response.json();
        setLiked(!liked); // Inverse l'état `liked`
        onLikeToggle(game.name);
        // Affiche le toast Chakra
        toast({
          title: liked ? "Game unliked" : "Game liked",
          description: data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        // Si erreur dans la réponse
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
      // Si erreur dans la requete
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An error occurred while liking the game.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Card borderRadius={5} overflow="hidden">
      <CardBody backgroundColor="#171d50">
        <Flex direction="column" alignItems="center" justifyContent="center">
          <Image
            src={getCroppedImageUrl(game.background_image)}
            boxSize={{ base: "100px", sm: "100px", md: "150px", lg: "200px" }}
            borderRadius="50%"
            objectFit="cover"
          />
          <Box mt={2}>
            <Text
              fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
              color="white"
            >
              {game.name}
            </Text>
            <HStack justifyContent="space-between">
              <PlatformIconList
                platforms={game.parent_platforms.map((p) => p.platform)}
              />
              <CriticScore score={game.metacritic} />
            </HStack>
            <Button
              colorScheme={liked ? "red" : "blue"}
              mt={2}
              onClick={handleLike}
            >
              {liked ? "Unlike" : "Like"}
            </Button>
          </Box>
          <StoreLink gameId={game.id.toString()} />
        </Flex>
      </CardBody>
    </Card>
  );
};

export default GameCard;
