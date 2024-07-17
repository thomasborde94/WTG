// src/App.tsx
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreButton from "./components/GenreButton";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/useGames";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";
import SearchInput from "./components/SearchInput";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  return (
    <Router>
      <Grid
        templateAreas={{
          base: `'nav' 'main' 'footer'`,
        }}
      >
        <GridItem area="nav">
          <NavBar />
        </GridItem>
        <GridItem area="main" width="90%" mx="auto">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Flex direction="column" alignItems="center">
                    <SearchInput
                      onSearch={(searchText) =>
                        setGameQuery({ ...gameQuery, searchText })
                      }
                    />
                    <Flex
                      marginTop={2}
                      justifyContent="center"
                      width="100%"
                      flexWrap="wrap"
                    >
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
                          onSelectGenre={(genre) =>
                            setGameQuery({ ...gameQuery, genre })
                          }
                        />
                      </Box>
                      <Box marginTop={{ base: 2, sm: 0, md: 0, lg: 0 }}>
                        <SortSelector
                          sortOrder={gameQuery.sortOrder}
                          onSelectSortOrder={(sortOrder) =>
                            setGameQuery({ ...gameQuery, sortOrder })
                          }
                        />
                      </Box>
                    </Flex>
                  </Flex>
                  <GameHeading gameQuery={gameQuery} />
                  <GameGrid gameQuery={gameQuery} />
                </>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
          </Routes>
        </GridItem>
        <GridItem area="footer">
          <Footer />
        </GridItem>
      </Grid>
    </Router>
  );
}

export default App;
