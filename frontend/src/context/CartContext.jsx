/**
 * @file CartContext.jsx
 * @description Fournit un contexte React global pour la gestion du panier dans l'application ShopEase.
 * Permet d'ajouter, retirer, mettre à jour la quantité d’un produit et vider le panier.
 * Les données du panier sont persistées dans le localStorage pour conserver l’état entre les sessions utilisateur.
 * @author Fadhel Smari
 */

import { createContext, useContext, useEffect, useState } from 'react';

// Création du contexte du panier
const CartContext = createContext();

/**
 * @function useCart
 * @description Hook personnalisé pour accéder au contexte du panier.
 * @returns {Object} Objet contenant les produits du panier et les fonctions associées.
 */
export const useCart = () => useContext(CartContext);

/**
 * @component CartProvider
 * @description Composant fournisseur du contexte du panier.
 * Gère l’état global du panier et expose les opérations liées.
 * Sauvegarde automatiquement l’état du panier dans le localStorage.
 * @param {ReactNode} children - Composants enfants ayant accès au contexte.
 * @returns {JSX.Element} Fournisseur de contexte englobant les enfants.
 */
export const CartProvider = ({ children }) => {
  // État du panier, initialisé à partir du localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Synchronisation de l’état du panier avec le localStorage à chaque mise à jour
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  /**
   * @function addToCart
   * @description Ajoute un produit au panier ou augmente la quantité si le produit existe déjà.
   * @param {Object} product - Produit à ajouter, doit contenir un identifiant unique (`id`).
   */
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  /**
   * @function removeFromCart
   * @description Supprime complètement un produit du panier.
   * @param {string|number} productId - Identifiant unique du produit à retirer.
   */
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  /**
   * @function updateQuantity
   * @description Modifie la quantité d’un produit dans le panier.
   * Supprime l’élément si la quantité devient nulle ou négative.
   * @param {string|number} productId - Identifiant du produit concerné.
   * @param {number} quantity - Nouvelle quantité.
   */
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  /**
   * @function clearCart
   * @description Vide complètement le panier.
   */
  const clearCart = () => {
    setCartItems([]);
  };

  // Fournisseur du contexte avec les fonctions et les données du panier
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
