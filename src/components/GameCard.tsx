// src/components/GameCard.tsx

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
      const response = await fetch("http://localhost:3000/api/liked-games", {
        method: liked ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          gameName: game.name,
          genre: game.genres[0]?.name, // Assurez-vous d'avoir un genre valide
        }),
      });

      // Vérifier si la réponse est OK
      if (response.ok) {
        const data = await response.json();
        setLiked(!liked);
        onLikeToggle(game.name);
        toast({
          title: liked ? "Game unliked" : "Game liked",
          description: data.message, // Utilisez le message de la réponse
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
