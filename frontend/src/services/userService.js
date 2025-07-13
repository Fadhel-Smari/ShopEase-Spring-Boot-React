/**
 * @file userService.js
 * @description Fournit des fonctions pour interagir avec le profil utilisateur via l'API ShopEase.
 * Contient les appels pour consulter et mettre à jour le profil utilisateur authentifié.
 * @author Fadhel Smari
 */

import api from "./api";

/**
 * @function getUserProfile
 * @description Récupère les informations du profil de l'utilisateur actuellement connecté.
 * Cette fonction envoie une requête GET au endpoint '/users/profile'.
 * @returns {Promise<Object>} Une promesse qui résout avec les données du profil utilisateur.
 */
export const getUserProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

/**
 * @function updateUserProfile
 * @description Met à jour les informations du profil de l'utilisateur actuellement connecté.
 * Cette fonction envoie une requête PUT au endpoint '/users/profile' avec les données à mettre à jour.
 * @param {Object} updatedData - Un objet contenant les champs du profil à mettre à jour.
 * @returns {Promise<Object>} Une promesse qui résout avec les données du profil utilisateur mises à jour.
 */
export const updateUserProfile = async (updatedData) => {
  const response = await api.put("/users/profile", updatedData);
  return response.data;
};
