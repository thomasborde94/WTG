import useData from "./useData"

interface Platform {
    id: number
    name: string
    slug: string
}

// Hook pour récupérer les plateformes de jeux vidéo
const usePlatform = () => useData<Platform>('/platforms/lists/parents')

export default usePlatform