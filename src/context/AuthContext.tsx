import React, { createContext, useContext, useState, ReactNode } from "react";

// Définition du type pour le contexte d'authentification
interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// Création du contexte avec une valeur par défaut undefined
// // Cela signifie que si un composant essaie d'utiliser ce contexte sans un `AuthProvider`, une erreur sera lancée
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  // Retourne le contexte pour que les composants puissent accéder à `isLoggedIn`, `login`, et `logout`
  return context;
};

// Composant fournisseur d'authentification (`AuthProvider`)
// Il enveloppe l'application ou les parties de l'application où l'état d'authentification est nécessaire
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    // Initialisation de l'état à partir du localStorage
    return !!localStorage.getItem("token");
  });

  // Fonction pour connecter l'utilisateur
  // Met à jour l'état `isLoggedIn` à `true`
  const login = () => {
    setIsLoggedIn(true);
  };

  // Fonction pour déconnecter l'utilisateur
  // Elle supprime le token du `localStorage` et met à jour l'état `isLoggedIn` à `false`
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
