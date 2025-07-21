/**
 * @file Checkout.jsx
 * @description Composant React affichant un récapitulatif de commande avant paiement.
 * Permet à l’utilisateur connecté de confirmer sa commande en envoyant les données à l’API.
 * Affiche les informations utilisateur, les produits du panier et le total à payer.
 * Redirige vers la page de commande après création. Gère les erreurs éventuelles.
 * @author Fadhel Smari
 */

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orderService';

/**
 * @component Checkout
 * @description Composant chargé de l’affichage et de la validation du récapitulatif de commande.
 * Récupère les informations du panier et de l’utilisateur via les contextes.
 * Envoie une requête à l’API pour créer une commande, vide le panier et redirige vers la commande créée.
 * @returns {JSX.Element} Interface utilisateur permettant de valider une commande ou un message d’erreur.
 */
const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirmOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const orderPayload = {
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };
      const order = await createOrder(orderPayload);
      clearCart();
      navigate(`/orders/${order.id}`);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la création de la commande.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return <p>Votre panier est vide.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Résumé de la commande</h2>

      <div className="bg-white shadow-md rounded p-4 mb-4">
        <h3 className="font-semibold mb-2">Informations client</h3>
        <p><strong>Nom :</strong> {user?.name}</p>
        <p><strong>Email :</strong> {user?.email}</p>
      </div>

      <div className="bg-white shadow-md rounded p-4 mb-4">
        <h3 className="font-semibold mb-2">Produits</h3>
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between border-b py-2">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">Quantité : {item.quantity}</p>
            </div>
            <p>{(item.price * item.quantity).toFixed(2)} $</p>
          </div>
        ))}
        <div className="text-right mt-2 font-bold">
          Total : {getTotalPrice().toFixed(2)} $
        </div>
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        onClick={handleConfirmOrder}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Traitement...' : 'Valider la commande'}
      </button>
    </div>
  );
};

export default Checkout;
