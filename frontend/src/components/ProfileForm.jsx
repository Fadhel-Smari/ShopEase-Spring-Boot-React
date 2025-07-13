/**
 * @file ProfileForm.jsx
 * @description Composant React permettant à l'utilisateur de consulter et modifier son profil.
 * Inclut des fonctionnalités de mise en édition, soumission et annulation.
 * Affiche les champs : prénom, nom, nom d'utilisateur (lecture seule), email.
 * Utilise les services API pour récupérer et mettre à jour les données utilisateur dans ShopEase.
 * @author Fadhel Smari
 */

import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../services/userService";
import { toast } from "react-toastify";

/**
 * @component ProfileForm
 * @description Formulaire interactif de profil utilisateur avec support d’édition contrôlée.
 * Permet de modifier certains champs du profil, avec gestion des erreurs et indicateurs de chargement.
 * @returns {JSX.Element} Composant de formulaire React.
 */
const ProfileForm = () => {
  // État pour les données du formulaire
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
  });

  // Stockage des données initiales (pour annulation)
  const [originalData, setOriginalData] = useState(null);

  // État de chargement pendant la requête API
  const [loading, setLoading] = useState(false);

  // État d'édition : true si l'utilisateur est en train de modifier son profil
  const [isEditing, setIsEditing] = useState(false);

  // Chargement initial des données utilisateur
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setFormData(data);
        setOriginalData(data);
      } catch (error) {
        toast.error("Erreur lors du chargement du profil.");
      }
    };

    fetchProfile();
  }, []);

  /**
   * @function handleChange
   * @description Met à jour le champ modifié dans l'état local du formulaire.
   * N'est actif que si le mode édition est activé.
   * @param {Object} e - Événement de changement d’un champ du formulaire.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!isEditing) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * @function handleSubmit
   * @description Soumet les modifications de profil à l'API et met à jour les états locaux.
   * Affiche des notifications selon le succès ou l'échec de la requête.
   * @param {Object} e - Événement de soumission du formulaire.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile({
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
      });
      toast.success("Profil mis à jour avec succès !");
      setIsEditing(false);
      setOriginalData(formData);
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du profil.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * @function handleCancel
   * @description Annule les modifications et restaure les données d’origine.
   */
  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <div>
        <label className="block font-semibold">Prénom</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-semibold">Nom</label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-semibold">Nom d'utilisateur</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          disabled
          className="w-full bg-gray-100 border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-semibold">Adresse email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {isEditing ? (
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Mise à jour..." : "Mettre à jour le profil"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Annuler
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Modifier le profil
        </button>
      )}
    </form>
  );
};

export default ProfileForm;
