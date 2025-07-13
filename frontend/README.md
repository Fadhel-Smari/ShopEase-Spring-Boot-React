# 🛍️ Frontend – ShopEase

## 🎯 Introduction

Le frontend de l'application **ShopEase** est développé avec **React** et stylisé avec **Tailwind CSS**.
Il consomme les API REST sécurisées exposées par le backend Spring Boot, et offre une interface fluide et moderne pour :

- les clients (consultation des produits, panier, commandes, paiement)
- les administrateurs (gestion des utilisateurs, des produits et statistiques)

---

## ⚙️ Technologies utilisées

| Outil               | Version utilisée    | Description                                     |
|---------------------|---------------------|-------------------------------------------------|
| React               | 19.1.0              | Bibliothèque principale                         |
| Tailwind CSS        | 3.4.17              | Framework CSS utilitaire                        |
| React Router DOM    | 6.30.1              | Navigation et routage                           |
| Axios               | 1.10.0              | Requêtes HTTP vers l’API backend                |
| Redux Toolkit       | 2.8.2               | Gestion d’état globale (optionnel mais prévu)   |
| React Toastify      | 11.0.5              | Notifications utilisateur                       |
| Stripe.js           | 7.4.0               | Intégration du paiement Stripe                  |
|Visual Studio Code   | 1.101.2             |  Éditeur de code
---

## Étapes d’installation et configuration (Ubuntu)

### Prérequis déjà installés

- `Node.js v22.17.0`
- `npm v11.4.2`

---

### 1. Création du projet React (dans le dossier `frontend`)

```bash
npx create-react-app . --template cra-template
```

### 2. Nettoyage des fichiers inutiles
```bash
rm -rf src/App.test.js src/logo.svg src/reportWebVitals.js src/setupTests.js
```
### 3. Installation de Tailwind CSS (version 3.x)
```bash
npm install -D tailwindcss@3 autoprefixer postcss
npx tailwindcss init -p
```
Configuration du fichier tailwind.config.js :

```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
Ajout des directives dans src/index.css :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
### 4. Installation des bibliothèques nécessaires
```bash
npm install axios react-router-dom@6 react-redux @reduxjs/toolkit react-toastify @stripe/stripe-js
```
### 5. Démarrage de l’application
```bash
npm start
```
➡️ L’application est disponible sur http://localhost:3000

## Étapes de Développement de l’interface frontend

# Étape 1 – Base du frontend : Layout + Navigation

## 🎯 Objectif

Mettre en place la structure de base de l’interface avec React + Tailwind :
- Navigation avec `react-router-dom`
- Pages publiques (Accueil, Connexion, Inscription)
- Composants globaux (`Navbar`, `Footer`)
- Structure Layout (responsive, avec Tailwind)

## Résultat

- Accès aux pages `/`, `/login`, `/register`, et page 404 (`*`)
- Barre de navigation fonctionnelle
- Layout cohérent et prêt pour les prochaines étapes

## 🧪 Test

Lancer le projet avec :

```bash
npm start
```

# Étape 2 : Authentification (JWT côté client)

## 🎯 Objectif

Cette étape vise à mettre en place l’authentification côté client dans l'application **ShopEase**, à l’aide de **tokens JWT**.  
Elle permet aux utilisateurs de s’inscrire, se connecter, et d’accéder à des routes protégées selon leur rôle (`CLIENT` ou `ADMIN`).

## Fonctionnalités implémentées

- **Formulaires d’inscription et de connexion**
  → Envoie les données au backend via des requêtes POST `/api/auth/register` et `/api/auth/login`.

- **Gestion du token JWT**
  → Le token est stocké dans `localStorage` après la connexion et utilisé automatiquement pour les futures requêtes.

- **Axios avec intercepteur**
  → Intercepte chaque requête HTTP sortante et y ajoute l’en-tête `Authorization: Bearer <token>`.

- **Routes protégées par rôle**
  → Accès restreint aux routes selon que l’utilisateur est connecté et son rôle (ex. : `CLIENT`, `ADMIN`).

## Structure des fichiers de cette étape

| Ordre | Élément                     | Description                                               |
|-------|-----------------------------|-----------------------------------------------------------|
| 1️⃣   | `utils/tokenUtils.js`       | Gestion des tokens dans le `localStorage`                |
| 2️⃣   | `services/api.js`           | Configuration d’Axios avec intercepteur JWT              |
| 3️⃣   | `context/AuthContext.jsx`   | Contexte global pour partager l’état d’authentification  |
| 4️⃣   | `services/authService.js`   | Requêtes API pour le `login()` et `register()`           |
| 5️⃣   | `pages/Login.jsx`           | Formulaire de connexion                                  |
| 6️⃣   | `pages/Register.jsx`        | Formulaire d’inscription                                 |
| 7️⃣   | `routes/ProtectedRoute.jsx` | Composant pour protéger l’accès aux pages sensibles      |
| 8️⃣   | `App.jsx`                   | Définition des routes publiques et privées               |


## Utilisation

### 1. Inscription / Connexion

   - Aller sur `/register` pour créer un compte.
   - Aller sur `/login` pour se connecter.
   - Une fois connecté, le token est stocké dans le navigateur (`localStorage`).

### 2. Accès aux routes protégées

   - Les routes comme `/profile`, `/orders`, ou `/admin` nécessitent une authentification.
   - `ProtectedRoute.jsx` vérifie si l’utilisateur est connecté et possède le bon rôle.

### 3. Déconnexion

   - La déconnexion supprime le token du `localStorage` et redirige l’utilisateur vers la page de connexion.

## 🧪 Tests manuels

- Créer un compte avec `/register` (ou utiliser un utilisateur de test existant).
- Se connecter avec `/login`, vérifier que le token est bien stocké.
- Accéder à une route protégée (`/profile` ou `/admin`) avec et sans token pour tester la redirection automatique.

---

## Notes techniques

- L’intercepteur Axios gère automatiquement l’en-tête `Authorization`.
- Les rôles sont décodés à partir du payload JWT.
- Le contexte React (`AuthContext`) permet d’accéder à l’utilisateur connecté dans toute l’application.

## Étape 3 – Gestion du profil utilisateur (Frontend)

### 🎯 Objectif

Permettre à l’utilisateur connecté :
- D’afficher ses informations personnelles (prénom, nom, email, username)
- De modifier son prénom, nom ou email via un formulaire
- D’utiliser les routes sécurisées du backend (`GET` et `PUT /api/users/profile`)
- De se déconnecter proprement avec redirection vers la page de connexion

###  Fichiers créés et modifiés

| Fichier                      | Rôle                                               |
|-----------------------------|---------------------------------------------------|
| `src/pages/Profile.jsx`      | Page principale de profil (avec bouton déconnexion) |
| `src/components/ProfileForm.jsx` | Formulaire de modification du profil           |
| `src/services/userService.js` | Appels API vers le backend (récupération + mise à jour) |
| `src/context/AuthContext.jsx` | Gestion globale de l’authentification et fonction `logout` |

### Sécurité

- Le token JWT est automatiquement transmis via l’intercepteur Axios
- Le profil n’est accessible que pour les utilisateurs authentifiés
- Le `username` n’est **pas modifiable**, le `role` n’est **pas visible**
- La déconnexion supprime le token et redirige vers `/login`

---

### ✅ Fonctionnalités couvertes

- Appel `GET /api/users/profile`
- Appel `PUT /api/users/profile`
- Affichage dynamique et mise à jour en temps réel
- Notifications avec `react-toastify`
- Gestion de la déconnexion via le contexte d’authentification
- Bouton "Se déconnecter" visible uniquement quand l’utilisateur est connecté
- Redirection automatique vers la page de connexion après déconnexion

# 🧪 Tests

## Pré-requis
- Être connecté avec un utilisateur valide (`CLIENT` ou `ADMIN`)
- Le token JWT est présent dans le `localStorage`
- Le frontend (`http://localhost:5173`) est lancé
- Le backend (`http://localhost:8080`) est fonctionnel

---

## Test 1 : Affichage du profil

1. Se connecter via `/login`
2. Accéder à `/profile`
3. Vérifier que le formulaire est pré-rempli avec :
   - prénom, nom, email (éditables)
   - nom d’utilisateur (lecture seule)

✅ Résultat attendu :
- Les données proviennent de `/api/users/profile` (GET)
- En cas d'échec ou token invalide → redirection vers `/login`

## Test 2 : Mise à jour du profil

1. Modifier le prénom, le nom ou l’email
2. Cliquer sur **Mettre à jour le profil**

✅ Résultat attendu :
- Requête `PUT /api/users/profile` envoyée avec succès
- Notification Toast : « Profil mis à jour avec succès »
- Le formulaire affiche les nouvelles données

## Test 3 : Déconnexion

1. Depuis `/profile`, cliquer sur **Déconnexion**
2. Observer la redirection automatique vers `/login`

✅ Résultat attendu :
- Le token JWT est supprimé du `localStorage`
- Le contexte utilisateur est réinitialisé (`user === null`)
- Les liens "Connexion" et "Inscription" réapparaissent dans la Navbar

## Sécurité

- Les pages `/profile` et `/api/users/profile` sont protégées par JWT
- Sans token valide :
  - Accès refusé côté backend (401)
  - Redirection vers `/login` côté frontend







