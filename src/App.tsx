import { Box, Flex, Grid, GridItem, HStack } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreButton from "./components/GenreButton";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/useGames";
import { queryObjects } from "v8";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  return (
    <>
      <Grid
        templateAreas={{
          base: `'nav''section main' 'footer'`,
          //lg: `'nav''section main' 'footer'`,
        }}
      ></Grid>
      <GridItem area="nav">
        <NavBar
          onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
        />
      </GridItem>
      <GridItem area="section">
        <Flex marginBottom={4}>
          <Box marginRight={{ base: 2, lg: 5 }}>
            <PlatformSelector
              selectedPlatform={gameQuery.platform}
              onSelectPlatform={(platform) =>
                setGameQuery({ ...gameQuery, platform })
              }
            />
          </Box>
          <Box marginRight={{ base: 2, lg: 5 }}>
            <GenreButton
              selectedGenre={gameQuery.genre}
              onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
            />
          </Box>
          <SortSelector
            sortOrder={gameQuery.sortOrder}
            onSelectSortOrder={(sortOrder) =>
              setGameQuery({ ...gameQuery, sortOrder })
            }
          />
        </Flex>
      </GridItem>
      <GridItem area="main">
        <GameHeading gameQuery={gameQuery} />
        <GameGrid gameQuery={gameQuery} />
      </GridItem>
      <GridItem area="footer">Footer</GridItem>
    </>
  );
}

export default App;
