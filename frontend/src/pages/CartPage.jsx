/**
 * @file CartPage.jsx
 * @description Composant React représentant la page de panier de ShopEase.
 * Affiche tous les articles ajoutés au panier avec leur quantité et prix.
 * Permet de voir le total et de passer à l’étape de commande (checkout).
 * Utilise le contexte CartContext pour accéder au panier global de l’application.
 * @author Fadhel Smari
 */

import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';

/**
 * @component CartPage
 * @description Page affichant le contenu du panier de l’utilisateur.
 * Liste chaque article avec ses détails via le composant `CartItem`.
 * Calcule le prix total et permet de naviguer vers la page de paiement.
 * @returns {JSX.Element} Contenu du panier ou message si vide.
 */
const CartPage = () => {
  const { cartItems } = useCart(); // Récupération des articles du panier via le contexte
  const navigate = useNavigate(); // Hook pour la navigation programmée

  // Calcul du prix total du panier
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Fonction appelée lors du clic sur "Passer à la commande"
  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Votre panier</h1>

      {cartItems.length === 0 ? (
        // Affichage si le panier est vide
        <p className="text-gray-600">Votre panier est vide.</p>
      ) : (
        <>
          {/* Liste des articles du panier */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Affichage du total et bouton de commande */}
          <div className="mt-6 border-t pt-4 text-right">
            <p className="text-lg font-bold">
              Total : {totalPrice.toFixed(2)} $
            </p>
            <button
              onClick={handleCheckout}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Passer à la commande
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
