/**
 * @file orderService.js
 * @description Service de gestion des commandes pour l’application ShopEase.
 * Contient la fonction permettant de créer une commande via l’API backend.
 * Utilise une instance Axios préconfigurée (`api`) avec authentification JWT si applicable.
 * @author Fadhel Smari
 */

import api from './api';

/**
 * @function createOrder
 * @description Envoie les informations de la commande (panier, utilisateur, etc.)
 * au backend de ShopEase afin de créer une nouvelle commande.
 * 
 * @param {Object} payload - Données de la commande à transmettre à l’API.
 * @returns {Promise<Object>} Objet représentant la commande créée (réponse de l’API).
 */
export const createOrder = async (payload) => {
  const response = await api.post('/api/orders', payload);
  return response.data;
};
