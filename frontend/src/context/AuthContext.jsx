/**
 * @file AuthContext.jsx
 * @description Fournit un contexte d'authentification global pour l'application ShopEase.
 * Gère l'état utilisateur en fonction du token JWT, permet de connecter ou déconnecter l'utilisateur,
 * et expose ces données et fonctions à tous les composants via le contexte React.
 * Utilise `tokenUtils` pour extraire et supprimer le token depuis le localStorage.
 * @author Fadhel Smari
 */

import { createContext, useContext, useEffect, useState } from "react";
import { getToken, decodeToken, removeToken } from "../utils/tokenUtils";
import { useNavigate } from "react-router-dom";

// Création du contexte d'authentification
const AuthContext = createContext();

/**
 * @component AuthProvider
 * @description Composant fournisseur de contexte qui gère l'état utilisateur authentifié.
 * Analyse le token JWT au chargement et expose les fonctions `login`, `logout`, `setUser` et l'objet `user`.
 * @param {Object} props
 * @param {ReactNode} props.children - Composants enfants à envelopper avec le contexte
 * @returns {JSX.Element} Fournisseur de contexte avec les données utilisateur et fonctions de session
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /**
   * @function useEffect
   * @description À l'initialisation du contexte, récupère le token JWT (s'il existe),
   * le décode et initialise l'état `user` avec les informations de session.
   */
  useEffect(() => {
    const token = getToken();
    const payload = decodeToken(token);
    if (payload) {
      setUser({
        username: payload.sub,
        role: payload.role,
      });
    }
    setLoading(false);
  }, []);

  /**
   * @function login
   * @description Met à jour manuellement l'utilisateur dans le contexte avec les données reçues.
   * Utilisé après une authentification réussie côté serveur.
   * @param {Object} userData - Données de l'utilisateur (username, role)
   */
  const login = (userData) => {
    setUser({
      username: userData.username,
      role: userData.role,
    });
  };

  /**
   * @function logout
   * @description Déconnecte l'utilisateur en supprimant le token JWT du localStorage,
   * réinitialise l'état utilisateur local, et redirige vers la page de connexion.
   */
  const logout = () => {
    removeToken();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * @function useAuth
 * @description Hook personnalisé pour consommer plus facilement le contexte d'authentification.
 * @returns {Object} L'objet de contexte contenant `user`, `setUser`, `login`, `logout`
 */
export const useAuth = () => useContext(AuthContext);

export { AuthContext };
