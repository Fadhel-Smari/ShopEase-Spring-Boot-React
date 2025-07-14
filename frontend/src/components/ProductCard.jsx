/**
 * @file ProductCard.jsx
 * @description Composant React qui affiche une carte produit avec image, nom et prix.
 * Permet de naviguer vers la page de détails d’un produit via un lien cliquable.
 * Utilisé dans la liste des produits du catalogue ShopEase.
 * @author Fadhel Smari
 */

import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-2xl shadow-md p-4 hover:shadow-lg transition">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-700 font-medium">${product.price.toFixed(2)}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
