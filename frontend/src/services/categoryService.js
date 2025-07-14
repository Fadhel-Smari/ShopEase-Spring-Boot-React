/**
 * @file categoryService.js
 * @description Fournit une fonction pour récupérer la liste des catégories via l'API ShopEase.
 * Contient l'appel pour obtenir toutes les catégories disponibles.
 * @author Fadhel Smari
 */

import api from './api';

/**
 * @function getAllCategories
 * @description Récupère toutes les catégories de produits disponibles.
 * Envoie une requête GET au endpoint '/categories'.
 * @returns {Promise<Array>} Une promesse qui résout avec un tableau des catégories.
 */
export const getAllCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};
