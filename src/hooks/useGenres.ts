import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Genre {
    id: number
    name: string
}

interface FetchGenresResponse {
    count: number
    results: Genre[]
}

const useGenres = () => {
        const [genres, setGenres] = useState<Genre[]>([]);
        const [error, setError] = useState("");
        const [isLoading, setLoading] = useState(false)
          
        //To send a fetch request to backend
        // second argument is an empty array, to make sure we call the api only once
        useEffect(() => {
          const controller = new AbortController()
          // signal cancels the first call due tu strict mode 
          setLoading(true)
          apiClient
            .get<FetchGenresResponse>("/genres", {signal: controller.signal})
            .then((res) => {
              setGenres(res.data.results)
              setLoading(false)
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message)});
                setLoading(false)
    
            return () => controller.abort()
        }, []);
        return { genres, error, isLoading }
    }

export default useGenres