import { GameQuery } from "../App";
import useData from "./useData";
import { Genre } from "./useGenres";

export interface Platform {
    id: number;
    name: string;
    slug: string;
}

export interface Game {
    id: number;
    name: string;
    background_image:string;
    parent_platforms: {platform: Platform}[];
    metacritic: number;
    genres: Genre[];
  }
  
// The hook gets the optional selected genre param
const useGames = (gameQuery: GameQuery) => useData<Game>('/games', {
  params: {
    genres: gameQuery.genre?.id,
    platforms: gameQuery.platform?.id,
    ordering: gameQuery.sortOrder,
    search: gameQuery.searchText,
    page_size: 3 // Limite le nombre de résultats par page ici
  }}, [gameQuery]) // l'effet se déclenche lorsque `gameQuery` change

export default useGames