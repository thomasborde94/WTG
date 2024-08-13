import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";


interface FetchResponse<T> {
    count: number
    results: T[]
}

// Hook générique pour récupérer des données depuis l'API
const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
  // États pour les données, les erreurs, et le statut de chargement
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false)
          
  //To send a fetch request to backend
  useEffect(() => {
  const controller = new AbortController()

  setLoading(true)
  // Envoi de la requête HTTP avec Axios
  // signal cancels the first call due tu strict mode 
  apiClient
  .get<FetchResponse<T>>(endpoint, {signal: controller.signal, ...requestConfig})
  .then((res) => {
    setData(res.data.results) // Enregistre les résultats de l'API
    setLoading(false) // Indique que le chargement est terminé
    })
  .catch((err) => {
    if (err instanceof CanceledError) return; // Ignore les erreurs dues à l'annulation de la requête
      setError(err.message)}); // Enregistre l'erreur rencontrée
      setLoading(false) // Indique que le chargement est terminé même en cas d'erreur
    
    return () => controller.abort()
  }, deps ? [...deps]: []);
  // Retourne les données, l'erreur, et le statut de chargement
  return { data, error, isLoading }
}

export default useData