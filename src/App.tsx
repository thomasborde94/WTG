import { Grid, GridItem } from "@chakra-ui/react";

function App() {
  return (
    <>
      <Grid
        templateAreas={{
          base: `'nav''section main'`,
          lg: `'nav''section main'`,
        }}
      ></Grid>
      ;
      <GridItem area="nav" bg="coral">
        Nav
      </GridItem>
      <GridItem area="section" bg="gold">
        Section
      </GridItem>
      <GridItem area="main" bg="dodgerblue">
        main
      </GridItem>
      {/* <GridItem area="nav" bg="coral">
    Nav
  </GridItem> */}
    </>
  );
}

export default App;
