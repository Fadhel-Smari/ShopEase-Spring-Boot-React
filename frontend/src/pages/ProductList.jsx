/**
 * @file ProductList.jsx
 * @description Composant principal d'affichage du catalogue produits de ShopEase.
 * Permet d'afficher tous les produits disponibles ou de les filtrer dynamiquement par nom, catégorie et prix.
 * Utilise les composants `ProductCard` pour chaque produit et `ProductFilters` pour les filtres de recherche.
 * Les données sont récupérées via `getAllProducts` et `searchProducts` du service `productService.js`.
 * @author Fadhel Smari
 */

import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import { getAllProducts, searchProducts } from '../services/productService';

/**
 * @component ProductList
 * @description Composant React qui affiche une liste de produits avec une interface de recherche filtrée.
 * Initialise l'affichage avec tous les produits disponibles, puis met à jour la liste selon les filtres.
 * @returns {JSX.Element} Section catalogue avec filtres et grilles de produits.
 */
const ProductList = () => {
  // État contenant la liste des produits à afficher
  const [products, setProducts] = useState([]);

  // État des filtres de recherche (nom, catégorie, prix min/max)
  const [filters, setFilters] = useState({
    name: '',
    categoryId: '',
    minPrice: '',
    maxPrice: '',
  });

  /**
   * @function fetchProducts
   * @description Récupère tous les produits sans filtre (appel initial).
   */
  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Erreur lors du chargement des produits', error);
    }
  };

  /**
   * @function handleSearch
   * @description Envoie les filtres appliqués à l'API pour récupérer les produits correspondants.
   */
  const handleSearch = async () => {
    try {
      // Nettoie les filtres pour éviter les chaînes vides
      const cleanedFilters = {
        ...filters,
        minPrice: filters.minPrice || null,
        maxPrice: filters.maxPrice || null,
        categoryId: filters.categoryId || null,
      };
      const results = await searchProducts(cleanedFilters);
      setProducts(results);
    } catch (error) {
      console.error('Erreur lors de la recherche de produits', error);
    }
  };

  // Chargement initial des produits
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Catalogue des produits</h1>

      {/* Composant des filtres : champ nom, catégorie, prix */}
      <ProductFilters
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
      />

      {/* Grille d'affichage des produits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full">Aucun produit trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
