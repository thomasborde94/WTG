import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import GenreButton from "./components/GenreButton";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/useGames";

function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  );

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
          selectedPlatform={selectedPlatform}
          onSelectPlatform={(platform) => setSelectedPlatform(platform)}
        />
        <GenreButton onSelectGenre={(genre) => setSelectedGenre(genre)} />
      </GridItem>
      <GridItem area="main" bg="dodgerblue">
        <GameGrid
          selectedGenre={selectedGenre}
          selectedPlatform={selectedPlatform}
        />
      </GridItem>
      <GridItem area="footer" bg="coral">
        Footer
      </GridItem>
    </>
  );
}

export default App;
