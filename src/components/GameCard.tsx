import { Game } from "../hooks/useGames";
import { Card, CardBody, Flex, Image, Text, Box } from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card borderRadius={5} overflow="hidden">
      <CardBody backgroundColor="#171d50">
        <Flex direction="column" alignItems="flex-start">
          <Image
            src={game.background_image}
            boxSize={{ base: "50px", sm: "100px", md: "150px", lg: "200px" }}
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
            <PlatformIconList
              platforms={game.parent_platforms.map((p) => p.platform)}
            />
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default GameCard;
