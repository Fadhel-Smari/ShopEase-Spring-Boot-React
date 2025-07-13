/**
 * @file Profile.jsx
 * @description Page de profil utilisateur dans l'application ShopEase.
 * Affiche un titre et rend le composant <ProfileForm /> pour consulter et modifier le profil de l'utilisateur connecté.
 * Cette page est protégée et accessible uniquement après authentification via JWT (côté frontend et backend).
 * @author Fadhel Smari
 */

import { useContext } from "react";
import ProfileForm from "../components/ProfileForm";
import { AuthContext } from "../context/AuthContext";

/**
 * @component Profile
 * @description Composant de page affichant le formulaire de profil utilisateur.
 * @returns {JSX.Element} La page contenant le titre et le formulaire du profil.
 */
const Profile = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Mon Profil</h1>
      <ProfileForm />
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Se déconnecter
      </button>
    </div>
  );
};

export default Profile;
