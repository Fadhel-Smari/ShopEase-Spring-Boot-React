/**
 * @file ProductDetails.jsx
 * @description Composant React affichant les détails d’un produit spécifique.
 * Récupère les informations d’un produit via l’API ShopEase en fonction de l’ID dans l’URL.
 * Affiche l’image, le nom, la description, le prix, la disponibilité en stock et la catégorie.
 * Ajoute un bouton “Ajouter au panier” si le produit est en stock.
 * @author Fadhel
 */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useCart } from '../context/CartContext'; // ✅ ajout ici

/**
 * @component ProductDetails
 * @description Composant chargé d’afficher les informations détaillées d’un produit.
 * Utilise le paramètre `id` de la route pour récupérer le produit via l’API.
 * Affiche un message de chargement pendant la récupération des données.
 * @returns {JSX.Element} Détails complets du produit ou message de chargement.
 */
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // ✅ hook pour ajouter au panier

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Erreur lors du chargement du produit', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Chargement du produit...</div>;
  }

  if (!product) {
    return <div className="text-center py-8 text-red-600">Produit introuvable.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image du produit */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-auto rounded-xl shadow"
        />

        {/* Informations textuelles */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-2">
            ${product.price?.toFixed(2) ?? '0.00'}
          </p>
          <p className={`mb-4 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
          </p>

          <p className="text-sm text-gray-500 mb-6">
            Catégorie : {product.categoryName || 'Non spécifiée'}
          </p>

          {/* ✅ Bouton Ajouter au panier si stock > 0 */}
          {product.stock > 0 && (
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700"
            >
              Ajouter au panier
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
