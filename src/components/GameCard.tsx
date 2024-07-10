import React from "react";
import { Game } from "../hooks/useGames";
import { Card, CardBody, Flex, Image, Text } from "@chakra-ui/react";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card borderRadius={5} overflow="hidden">
      <CardBody backgroundColor="#171d50">
        <Flex alignItems="center">
          <Image
            src={game.background_image}
            boxSize={{ base: "50px", sm: "100px", md: "150px", lg: "200px" }}
            borderRadius="50%"
            objectFit="cover"
          />
          <Text
            fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
            color="white"
            ml={4}
          >
            {game.name}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default GameCard;
