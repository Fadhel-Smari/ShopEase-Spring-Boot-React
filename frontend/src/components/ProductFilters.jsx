/**
 * @file ProductFilters.jsx
 * @description Composant de filtres pour la recherche de produits dans le catalogue ShopEase.
 * Permet de filtrer par nom, catégorie, prix minimum et prix maximum.
 * Récupère dynamiquement les catégories depuis l'API et déclenche la recherche au submit.
 * @author Fadhel Smari
 */

import { useEffect, useState } from 'react';
import { getAllCategories } from '../services/categoryService';

/**
 * @component ProductFilters
 * @description Formulaire de filtres de recherche pour les produits.
 * Récupère les catégories via l'API et fournit les champs pour filtrer par nom, catégorie et plage de prix.
 *
 * @param {Object} props
 * @param {Object} props.filters - État contenant les valeurs actuelles des filtres.
 * @param {Function} props.setFilters - Fonction pour mettre à jour les filtres.
 * @param {Function} props.onSearch - Fonction appelée lors de la soumission du formulaire.
 *
 * @returns {JSX.Element} Formulaire de filtres prêt à être intégré à une liste de produits.
 */
const ProductFilters = ({ filters, setFilters, onSearch }) => {
  // État local contenant la liste des catégories disponibles
  const [categories, setCategories] = useState([]);

  // Récupération des catégories dès le chargement du composant
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories', error);
      }
    };

    fetchCategories();
  }, []);

  /**
   * @function handleChange
   * @description Met à jour les filtres localement à chaque changement dans les champs du formulaire.
   * @param {Object} e - L’événement provenant d’un champ de formulaire.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * @function handleSubmit
   * @description Déclenche la recherche de produits avec les filtres actuels.
   * @param {Object} e - L’événement de soumission du formulaire.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded-xl shadow mb-6"
    >
      {/* Champ : Nom du produit */}
      <input
        type="text"
        name="name"
        value={filters.name}
        onChange={handleChange}
        placeholder="Nom du produit"
        className="border p-2 rounded-lg"
      />

      {/* Champ : Catégorie (dropdown dynamique) */}
      <select
        name="categoryId"
        value={filters.categoryId}
        onChange={handleChange}
        className="border p-2 rounded-lg"
      >
        <option value="">Toutes les catégories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Champ : Prix minimum */}
      <input
        type="number"
        name="minPrice"
        value={filters.minPrice}
        onChange={handleChange}
        placeholder="Prix min"
        className="border p-2 rounded-lg"
        min="0"
      />

      {/* Champ : Prix maximum */}
      <input
        type="number"
        name="maxPrice"
        value={filters.maxPrice}
        onChange={handleChange}
        placeholder="Prix max"
        className="border p-2 rounded-lg"
        min="0"
      />

      {/* Bouton de recherche */}
      <button
        type="submit"
        className="md:col-span-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Rechercher
      </button>
    </form>
  );
};

export default ProductFilters;
