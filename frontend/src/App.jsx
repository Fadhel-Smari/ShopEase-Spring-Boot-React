/**
 * @file App.jsx
 * @description Point d'entrée principal de l'application React ShopEase.
 * Configure le routage client avec React Router, incluant les routes publiques,
 * les pages produits, et les routes protégées nécessitant une authentification.
 * Utilise le contexte d'authentification et le contexte du panier.
 * Inclut la barre de navigation, le pied de page, et le wrapper global de l'app.
 * @author Fadhel Smari
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";

/**
 * @component App
 * @description Composant racine de l'application ShopEase.
 * Configure le router et définit les différentes routes de l'application.
 * Gère l'affichage de la Navbar, du Footer, et protège certaines routes avec les rôles d'utilisateur.
 * @returns {JSX.Element} L'application complète avec navigation et routage.
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            {/* Barre de navigation visible sur toutes les pages */}
            <Navbar />

            {/* Contenu principal de chaque page */}
            <main className="flex-grow">
              <Routes>
                {/* Routes publiques accessibles sans authentification */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Catalogue des produits */}
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetails />} />

                {/* Route protégée : accès réservé aux utilisateurs CLIENT et ADMIN */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute roles={["CLIENT", "ADMIN"]}>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Route de secours : page 404 pour les chemins inconnus */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Pied de page visible sur toutes les pages */}
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
