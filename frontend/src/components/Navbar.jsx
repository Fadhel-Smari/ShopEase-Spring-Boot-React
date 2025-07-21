/**
 * @file Navbar.jsx
 * @description Barre de navigation principale de l'application ShopEase.
 * Affiche dynamiquement les liens selon que l'utilisateur est connecté ou non.
 * Affiche toujours un lien vers le panier à droite.
 * @author Fadhel Smari
 */

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * @component Navbar
 * @returns {JSX.Element} Le composant Navbar affichant les liens de navigation.
 */
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">ShopEase</h1>
      <div className="flex items-center space-x-6">
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Accueil
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="hover:underline">
                Profil
              </Link>
              <button
                onClick={handleLogout}
                className="hover:underline bg-transparent border-none cursor-pointer"
                style={{ color: "inherit", fontSize: "inherit" }}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Connexion
              </Link>
              <Link to="/register" className="hover:underline">
                Inscription
              </Link>
            </>
          )}
        </div>

        {/* Lien vers le panier */}
        <Link
          to="/cart"
          className="hover:underline font-semibold bg-white text-blue-600 px-3 py-1 rounded-full shadow transition hover:bg-gray-100"
        >
          🛒 Panier
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
