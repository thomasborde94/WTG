import { Game } from "../hooks/useGames";
import {
  Card,
  CardBody,
  Flex,
  Image,
  Text,
  Box,
  HStack,
} from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import getCroppedImageUrl from "../services/image-url";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card
      borderRadius={5}
      overflow="hidden"
      //boxSize={{ base: "300px", sm: "300px", md: "300px", lg: "400px" }}
    >
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
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default GameCard;
