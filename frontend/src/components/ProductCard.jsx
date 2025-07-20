/**
 * @file ProductCard.jsx
 * @description Composant React qui affiche une carte produit avec image, nom et prix.
 * Permet de naviguer vers la page de détails d’un produit via un lien cliquable.
 * Utilisé dans la liste des produits du catalogue ShopEase.
 * Ajout du bouton “Ajouter au panier”.
 * @author Fadhel Smari
 */

import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // Empêche la navigation quand on clique sur le bouton
  const handleAddToCartClick = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="border rounded-2xl shadow-md p-4 hover:shadow-lg transition flex flex-col">
      <Link to={`/products/${product.id}`} className="flex-grow">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-700 font-medium">${product.price.toFixed(2)}</p>
      </Link>
      <button
        onClick={handleAddToCartClick}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        aria-label={`Ajouter ${product.name} au panier`}
      >
        Ajouter au panier
      </button>
    </div>
  );
};

export default ProductCard;
