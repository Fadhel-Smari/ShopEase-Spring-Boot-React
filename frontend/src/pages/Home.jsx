/**
 * @file Home.jsx
 * @description Composant React représentant la page d’accueil de l’application ShopEase.
 * Affiche un message de bienvenue et un lien vers le catalogue des produits.
 * Encourage les utilisateurs à explorer les produits disponibles, même sans être connectés.
 * @author Fadhel Smari
 */

import { Link } from "react-router-dom";

/**
 * @component Home
 * @description Page d’accueil de ShopEase.
 * Affiche un message introductif et propose une navigation vers la liste des produits.
 * Accessible à tous les utilisateurs, connectés ou non.
 * @returns {JSX.Element} Contenu principal de la page d’accueil avec lien vers /products.
 */
const Home = () => {
  return (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold mb-4">Bienvenue sur ShopEase !</h2>
      <p className="text-gray-600 mb-6">
        Explorez notre sélection de produits. Connectez-vous pour découvrir encore plus !
      </p>

      <Link
        to="/products"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
      >
        Voir les produits
      </Link>
    </div>
  );
};

export default Home;
