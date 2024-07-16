import useData from "./useData"

interface Stores {
    id: number
    game_id: string
    store_id: string
    url: string
}

const useStores = (gameId: string) => useData<Stores>(`/games/${gameId}/stores`);
//const useStores = () => useData<Stores[]>('/games/{game_pk}/stores')

export default useStores