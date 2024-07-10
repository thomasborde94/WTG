import axios from "axios";

// Log pour vérifier si la variable d'environnement est chargée correctement
console.log('API Key:', process.env.REACT_APP_RAWG_API_KEY);

// Vérification de la variable d'environnement
const apiKey = process.env.REACT_APP_RAWG_API_KEY;
if (!apiKey) {
  throw new Error("REACT_APP_API_KEY n'est pas défini");
}

const apiClient = axios.create({
  baseURL: 'https://api.rawg.io/api/',
  params: {
    key: apiKey
  }
});

export default apiClient;
