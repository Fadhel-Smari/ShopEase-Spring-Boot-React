/**
 * @file ProfileForm.jsx
 * @description Composant React pour afficher et modifier les informations du profil utilisateur.
 * Utilise les services API pour récupérer et mettre à jour les données du profil via ShopEase.
 * Gère les champs : prénom, nom, nom d’utilisateur (lecture seule), email.
 * @author Fadhel Smari
 */

import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../services/userService";
import { toast } from "react-toastify";

/**
 * @component ProfileForm
 * @description Composant de formulaire permettant à l'utilisateur de consulter et modifier son profil.
 * Le nom d'utilisateur est affiché en lecture seule. Les autres champs sont modifiables.
 * Les données sont initialisées via un appel à l'API `getUserProfile`, et soumises via `updateUserProfile`.
 * @returns {JSX.Element} Formulaire de mise à jour du profil utilisateur.
 */
const ProfileForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
  });

  // État de chargement lors de la soumission
  const [loading, setLoading] = useState(false);

  // Récupération des données du profil au chargement du composant
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setFormData(data);
      } catch (error) {
        toast.error("Erreur lors du chargement du profil.");
      }
    };

    fetchProfile();
  }, []);

  /**
   * @function handleChange
   * @description Met à jour les données du formulaire à chaque modification de champ.
   * @param {Object} e - L’événement de modification provenant d’un champ du formulaire.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * @function handleSubmit
   * @description Soumet les données modifiées du profil à l’API.
   * Affiche une notification en cas de succès ou d’erreur.
   * @param {Object} e - L’événement de soumission du formulaire.
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
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du profil.");
    } finally {
      setLoading(false);
    }
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
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Nom</label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
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
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Mise à jour..." : "Mettre à jour le profil"}
      </button>
    </form>
  );
};

export default ProfileForm;
