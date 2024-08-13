import axios from "axios";

// Log pour vérifier si la variable d'environnement est chargée correctement
console.log('API Key:', process.env.REACT_APP_RAWG_API_KEY);

// Vérification de la variable d'environnement
// clé utilisée pour authentifier les requêtes auprès de l'API RAWG.
const apiKey = process.env.REACT_APP_RAWG_API_KEY;
if (!apiKey) {
  throw new Error("REACT_APP_API_KEY n'est pas défini");
}

// Création d'une instance d'axios configurée pour interagir avec l'API RAWG
const apiClient = axios.create({
  baseURL: 'https://api.rawg.io/api/',  // URL de base pour l'API RAWG
  params: {
    key: apiKey // Ajoute la clé API en tant que paramètre à chaque requête.
  }
});

export default apiClient;
