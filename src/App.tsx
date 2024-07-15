import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import GenreButton from "./components/GenreButton";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/useGames";
import { queryObjects } from "v8";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
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
      <GridItem area="nav" bg="coral">
        <NavBar />
      </GridItem>
      <GridItem area="section" bg="gold">
        <PlatformSelector
          selectedPlatform={gameQuery.platform}
          onSelectPlatform={(platform) =>
            setGameQuery({ ...gameQuery, platform })
          }
        />
        <GenreButton
          selectedGenre={gameQuery.genre}
          onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
        />
      </GridItem>
      <GridItem area="main" bg="dodgerblue">
        <GameGrid gameQuery={gameQuery} />
      </GridItem>
      <GridItem area="footer" bg="coral">
        Footer
      </GridItem>
    </>
  );
}

export default App;
