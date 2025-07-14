/**
 * @file productService.js
 * @description Fournit des fonctions pour interagir avec l’API ShopEase concernant les produits.
 * Inclut des appels pour récupérer tous les produits, rechercher par filtres et obtenir un produit par ID.
 * @author Fadhel Smari
 */

import api from './api';

/**
 * @function getAllProducts
 * @description Récupère la liste complète des produits disponibles.
 * Effectue un appel GET au endpoint '/products'.
 * @returns {Promise<Array>} Une promesse qui résout avec un tableau de produits.
 */
export const getAllProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

/**
 * @function searchProducts
 * @description Recherche des produits en fonction de filtres dynamiques (catégories, mots-clés, prix, etc.).
 * Effectue un appel POST au endpoint '/products/search' avec les filtres dans le corps de la requête.
 * @param {Object} filters - Les critères de recherche à appliquer.
 * @returns {Promise<Array>} Une promesse qui résout avec les produits correspondants aux filtres.
 */
export const searchProducts = async (filters) => {
  const response = await api.post('/products/search', filters);
  return response.data;
};

/**
 * @function getProductById
 * @description Récupère les détails d’un produit spécifique à partir de son identifiant.
 * Effectue un appel GET au endpoint `/products/:productId`.
 * @param {string} productId - L’identifiant unique du produit.
 * @returns {Promise<Object>} Une promesse qui résout avec les détails du produit.
 */
export const getProductById = async (productId) => {
  const response = await api.get(`/products/${productId}`);
  return response.data;
};
