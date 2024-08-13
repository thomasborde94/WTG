import React, { createContext, useContext, useState } from "react";

// Interface pour un jeu liké
interface LikedGame {
  id: number;
  gameName: string;
  genre: string;
}

// Interface décrivant les méthodes et données disponibles dans le contexte
interface LikedGamesContextProps {
  likedGames: LikedGame[];
  addLikedGame: (game: LikedGame) => void;
  removeLikedGame: (gameName: string) => void;
}

// Créer le contexte avec des valeurs par défaut
const LikedGamesContext = createContext<LikedGamesContextProps>({
  likedGames: [],
  addLikedGame: () => {},
  removeLikedGame: () => {},
});

// Hook pour utiliser le contexte
export const useLikedGames = () => useContext(LikedGamesContext);

// Fournisseur du contexte
export const LikedGamesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [likedGames, setLikedGames] = useState<LikedGame[]>([]);

  // Fonction pour ajouter un jeu à la liste des jeux likés
  const addLikedGame = (game: LikedGame) => {
    setLikedGames((prevGames) => [...prevGames, game]);
  };

  // Fonction pour supprimer un jeu de la liste des jeux likés
  const removeLikedGame = (gameName: string) => {
    setLikedGames((prevGames) =>
      prevGames.filter((game) => game.gameName !== gameName)
    );
  };

  return (
    <LikedGamesContext.Provider
      value={{ likedGames, addLikedGame, removeLikedGame }}
    >
      {children}
    </LikedGamesContext.Provider>
  );
};

/*
Utilisation du context pour stocker et gérer l'etat des jeux en local => reactivité interface, sans attendre le
server Postgres SQL
*/
