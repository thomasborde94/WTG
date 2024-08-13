import useData from "./useData"

interface Stores {
    id: number
    game_id: string
    store_id: string
    url: string
}

// Hook pour récupérer les stores des jeux vidéos
const useStores = (gameId: string) => useData<Stores>(`/games/${gameId}/stores`);

export default useStores