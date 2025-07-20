/**
 * @file CartItem.jsx
 * @description Composant React affichant un article individuel dans le panier d’achat.
 * Permet de modifier la quantité ou de supprimer l’article du panier via le contexte CartContext.
 * Affiche l’image, le nom, le prix unitaire, et un champ pour ajuster la quantité.
 * @author Fadhel Smari
 */

import React from 'react';
import { useCart } from '../context/CartContext';

/**
 * @component CartItem
 * @param {Object} props
 * @param {Object} props.item - Objet représentant un article dans le panier.
 * @param {string|number} props.item.id - Identifiant unique de l’article.
 * @param {string} props.item.name - Nom de l’article.
 * @param {string} props.item.image_url - URL de l’image de l’article (clé alternative imageUrl gérée).
 * @param {number} props.item.price - Prix unitaire de l’article.
 * @param {number} props.item.quantity - Quantité actuellement sélectionnée dans le panier.
 * 
 * @description Composant affichant les informations d’un article dans le panier avec possibilité :
 * - de modifier la quantité via un champ input numérique,
 * - de retirer l’article avec un bouton de suppression.
 * Utilise les fonctions `updateQuantity` et `removeFromCart` fournies par le contexte `CartContext`.
 * 
 * @returns {JSX.Element} Représentation visuelle d’un article dans le panier.
 */
const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  // Gestion du changement de quantité dans le champ input
  const handleChange = (e) => {
    const quantity = parseInt(e.target.value, 10);
    if (!isNaN(quantity)) {
      updateQuantity(item.id, quantity);
    }
  };

  // Gestion de la suppression de l’article du panier
  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="flex items-center space-x-4 border p-4 rounded">
      <img
        src={item.image_url || item.imageUrl || ''}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p>{item.price.toFixed(2)} $ / unité</p>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleChange}
          className="w-16 border rounded px-2 py-1"
        />
        <button
          onClick={handleRemove}
          className="text-red-600 hover:text-red-800 font-bold"
          aria-label={`Supprimer ${item.name} du panier`}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default CartItem;
