Cet exercice change par rapport à d'habitude.

Il prend la forme d'un exercice guidé.

Vous devez simplement suivre ce fichier readme

----------------------------------------------


🎯 1. Objectif du projet

Créer une mini-boutique en ligne composée de :

🎨 Frontend (React)
--------------------
- Afficher une liste de produits (Home)
- Afficher un produit (Product)
- Gérer un panier (Cart)
- Faire un login simple (Login)
- Communiquer avec le backend avec fetch()

⚙️ Backend (Node.js + Express)
-------------------------------
- Fournir une API REST simple
- Routes : /products et /login
- Stocker les données dans des fichiers JSON (pas de base SQL au début)

🧱 2. Architecture du projet
-----------------------------
BOUTIQUE_REACT/
    README.md
    app/
        frontend/      ← sera créé plus tard avec Vite
        backend/       ← sera créé plus tard avec Express

🧠 3. Comprendre les rôles
---------------------------
    🔵 React (frontend)
    --------------------

    - Affiche les pages
    - Gère les clics / navigation
    - Récupère les données du backend via fetch
    - Ne stocke rien côté serveur

    🔴 Node.js + Express (backend)
    -------------------------------

    - Fournit des routes API
    - Renvoie des objets JSON
    - Simule une base de données via fichiers JSON
    - Authentifie un utilisateur (bcrypt)

    Comment ils communiquent ?
    ---------------------------

    Frontend React —(fetch)→ Backend Express —→ JSON → React

🛠️ 4. Outils nécessaires
-------------------------

    À installer avant tout :
    -------------------------

    - Node.js (version LTS)
    - VS Code
    - Git
    - Navigateur

-----------------------------------------------------------------
Commençons :
------------

🛒 Projet Boutique en Ligne
----------------------------

Démarrage – Étape 1 : Mise en place du projet

Bienvenue dans ton premier vrai projet React + Node.js.
L’objectif est de créer une petite boutique en ligne avec une interface React (frontend) et une API Node.js/Express (backend) en 8 jours.

Ce document t’explique exactement ce qu’il faut faire au début, pas plus, pas moins.

📁 1. Préparer l’environnement
✔️ Prérequis

Avant de commencer, vérifie dans le terminal que tu as les requis :

node -v
npm -v


Si ça affiche des versions → c’est bon.
Sinon télécharge Node.js LTS : https://nodejs.org

-----------------------------------------------------------------

📂 2. Organisation du dossier

Tu as déjà créé :

BOUTIQUE_REACT/


À l’intérieur, nous allons créer deux sous-dossiers :

BOUTIQUE_REACT/
   frontend/   → React (l’interface)
   backend/    → Node.js + Express (l’API)


Le frontend et le backend sont séparés.
----------------------------------------

⚛️ 3. Installation du FRONTEND (React via Vite)
------------------------------------------------

Dans ton dossier :

cd BOUTIQUE_REACT
mkdir frontend
cd frontend

Puis tu installes React avec Vite :
------------------------------------

npm create vite@latest . --template react

Quand Vite pose des questions :
--------------------------------

Question                Réponse
Framework ?             React
Variant ?               JavaScript
Use rolldown-vite ?     No
Install now ?           Yes

- Quand on vous le propose aller dans l'explorateur internet sur http://localhost:5173/ pour voir le résultat.
- Ensuite revenez dans le terminal et taper "CTRL" + C pour couper le serveur.
- Pour le relancer 
npm run dev
Aller sur http://localhost:5173/ dans l'explorateur internet

→ Votre site React fonctionne.
→ Vous devrez plus tard modifier cette page à src/App.jsx .

-----------------------------------------------------------------

🛠️ 4. Installation du BACKEND (Node.js + Express)
--------------------------------------------------

Depuis le dossier principal dasn un autre terminal :
Donc Taper :
cd ..
mkdir backend
cd backend

Initialisation :

npm init -y (cela cré le fichier package.json)
npm install express cors bcrypt

Dans backend créer le serveur :
------------------------------
    Créer un fichier server.js y copier le code suivant :
    ------------------------------------------------------

    const express = require('express');
    const cors = require('cors');
    const fs = require('fs');

    const app = express();
    const port = 3001;

    app.use(cors());
    app.use(express.json());

    // Lire les produits depuis le fichier JSON
    const products = JSON.parse(fs.readFileSync('./products.json', 'utf8'));

    // ROUTE PRODUITS
    app.get('/products', (req, res) => {
      res.json(products);
    });

    app.listen(port, () => {
      console.log("API running on http://localhost:" + port);
    });

    Créer products.json ( Exemple temporaire de produits à y mettre )
    --------------------

[
  { "id": 1, "name": "Sneakers Alpha", "price": 59.99 },
  { "id": 2, "name": "Casque Wave", "price": 89.90 }
]

Lancer l’API :
--------------

node server.js

→ API disponible dans : http://localhost:3001/products
→ C’est normal si ça affiche juste du texte ou du JSON.

si vous avez besoin d'arréter le serveur
(conseil : si quelque chose ne marche pas de relancer le back et le front)
npx kill-port 3001

puis relancer
node server.js

-----------------------------------------------------------------

🔗 5. Comprendre la communication FRONT ↔ BACK

React récupère les données comme ceci :

fetch("http://localhost:3001/products")
  .then(res => res.json())
  .then(data => console.log(data));


Le backend renvoie des données au frontend.

Ce fonctionnement s’appelle une API REST.

-----------------------------------------------------------------

Résumé :

Partie	                Commande            Démarre où ?
Frontend (React/Vite)    npm run dev        http://localhost:5173

Backend (Express)       node server.js      http://localhost:3001

-----------------------------------------------------------------

🎯 Résultat attendu
--------------------

À la fin du projet, tu auras une boutique où l’on peut :

- afficher une liste de produits
- voir une page produit
- ajouter au panier
- consulter le panier
- se connecter

Le projet te servira ensuite de base pour tout apprendre :
API, routes, composants, fetch, state, etc.

-----------------------------------------------------------------

MAINTENANT ON CODE !!!
---------------------

📁 1. Créer le dossier des pages
---------------------------------

Dans : frontend/src/
Crée un dossier : pages

📄 2. Créer dedans le fichier Home.jsx
Y mettre ce code suivant
-----------------------------------------------

import { useEffect, useState } from "react";

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("➡️ Appel API lancé...");

    fetch("http://localhost:3001/products")
      .then(res => {
        console.log("➡️ Réponse brute :", res);
        return res.json();
      })
      .then(data => {
        console.log("➡️ Données reçues :", data);
        setProducts(data);
      })
      .catch(err => {
        console.error("❌ Erreur API :", err);
        setError(err.toString());
      });
  }, []);

  return (
    <div>
      <h1>Produits</h1>

      {error && <p style={{color:"red"}}>Erreur : {error}</p>}
      {products.length === 0 && !error && <p>Chargement...</p>}

      {products.map(p => (
        <div key={p.id} style={{
          border:"1px solid #ddd",
          padding:"10px",
          margin:"10px",
          borderRadius:"8px"
        }}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <strong>{p.price} €</strong>
        </div>
      ))}
    </div>
  );
}

export default Home;


🔥 ÉTAPE 2 — Ajouter la navigation React Router
-------------------------------------------------
📦 Installer React Router
--------------------------

Dans le terminal VSCODE : (emplacement : frontend)

npm install react-router-dom

📄 Modifier src/main.jsx
--------------------------

Chemin : frontend/src/main.jsx

Remplacer tout par :
-------------------------

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
-------------------------

📄 Tout remplacer dans src/Home.jsx

Chemin : frontend/src/Home.jsx

Par le code ci-dessous :
-------------------------

import { useEffect, useState } from "react";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Erreur API :", err));
  }, []);

  return (
    <div>
      <h1>Produits</h1>

      {products.length === 0 && <p>Chargement...</p>}

      {products.map(p => (
        <div key={p.id} style={{
          border:"1px solid #ddd",
          padding:"10px",
          margin:"10px",
          borderRadius:"8px"
        }}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <strong>{p.price} €</strong>
        </div>
      ))}
    </div>
  );
}

export default Home;

-------------------------

🔥 ÉTAPE 3 — TESTER
1. Lancer ton backend
dans backend/
node server.js

Si ça affiche :
API running http://localhost:3001
➡️ OK.

2. Lancer ton frontend
Dans frontend :
npm run dev


Accéder à :
👉 http://localhost:5173

🎉 Si tu vois la liste des produits → c'est réussit !

🚀 5. Résumé des commandes dans l’ordre (juste pour être sûr)
BACKEND
cd BOUTIQUE_REACT/backend
node server.js

FRONTEND
cd BOUTIQUE_REACT/frontend
npm run dev

-----------------------------------------------------------------

✅ Prochaine étape : créer la page Product

Lorsqu’on clique sur un produit, on doit arriver sur une page dédiée avec les infos complètes.

📁 Étape 1 — Créer le fichier Product.jsx
📂 Emplacement

BOUTIQUE_REACT/frontend/src/pages/Product.jsx

📄 Contenu complet à copier/coller :
--------------------------------------

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Product() {
  const { id } = useParams();            // récupère l'id dans l'URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/products`)
      .then(res => res.json())
      .then(data => {
        const p = data.find(item => item.id == id);
        setProduct(p);
      })
      .catch(err => console.error("Erreur API :", err));
  }, [id]);

  if (!product) return <p>Chargement...</p>;

  return (
    <div style={{ maxWidth: "400px", margin: "30px" }}>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <h2>{product.price} €</h2>

      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          background: "#4F8",
          cursor: "pointer",
          fontSize: "18px"
        }}
      >
        Ajouter au panier
      </button>
    </div>
  );
}

export default Product;

📁 Étape 2 — Ajouter la route dans App.jsx
-------------------------------------------
📂 Emplacement BOUTIQUE_REACT/frontend/src/App.jsx

📄 Remplace le fichier entier par :
------------------------------------

(Home est déjà importé, on ajoute Product)

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
    </Routes>
  );
}

export default App;

--------------------------------

📁 Étape 3 — Ajouter le lien sur chaque produit dans Home.jsx
📂 Emplacement

BOUTIQUE_REACT/frontend/src/pages/Home.jsx

➡️ Remplace juste TON bloc products.map(...) par celui-ci :

{products.map(p => (
  <a
    key={p.id}
    href={`/product/${p.id}`}
    style={{ textDecoration: "none", color: "inherit" }}
  >
    <div
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        margin: "10px",
        borderRadius: "8px",
        display: "block"
      }}
    >
      <h3>{p.name}</h3>
      <strong>{p.price} €</strong>
    </div>
  </a>
))}

▶️ Étape 4 — Lancer & Tester

Dans deux terminaux distinct (sauf si ils tournent déjà):

Terminal 1 (backend)
cd backend
node server.js

Terminal 2 (frontend)
cd frontend
npm run dev


➡️ Ensuite va sur :
http://localhost:5173/

et clique sur un produit.

➡️ Tu dois voir :

nom du produit

description

prix

Ajoutons en remplaçant le return complet de Product.jsx  le bouton “Ajouter au panier”
---------------------------------------------------------------------------------------

return (
    <div style={{ maxWidth: "400px", margin: "30px" }}>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <h2>{product.price} €</h2>

      <button
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          borderRadius: "8px",
          border: "none",
          background: "#4F8",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "bold"
        }}
      >
        Ajouter au panier
      </button>
    </div>
  );

/!\ mettre le css ici est une mauvaise pratique, mais c'est un projet pour débutant donc

Donc on va changer cela :
---------------------------

Créer ce fichier : src/pages/Product.css

y mettre ceci :

.product-card {
  border: 1px solid #ddd;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
}

Puis dans Product.jsx

Changer par ceci :

-------------------------------------------
(A ajouter)
import "./Product.css";

(A modifier)
    <div style={{ maxWidth: "400px", margin: "30px" }}>
(par)
    <div className="product-card">

(A supprimer)
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          borderRadius: "8px",
          border: "none",
          background: "#4F8",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "bold"
        }}
-------------------------------------------

🎯 Conclusion
🔹 Mettre le CSS dans le composant → OK pour apprendre
🔹 Mettre dans des fichiers .css → Bonne pratique pour un vrai projet
🔹 Mettre dans un framework (Tailwind, Bootstrap) → Encore mieux

La suite :
----------

Cart.jsx
--------
import { useEffect, useState } from "react";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);

  // Charger le panier au chargement
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  // Calcul du total
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-container">
      <h1>Mon Panier</h1>

      {cart.length === 0 && <p>Votre panier est vide.</p>}

      {cart.map((item, index) => (
        <div key={index} className="cart-item">
          <h3>{item.name}</h3>
          <p>{item.price} €</p>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <h2>Total : {total.toFixed(2)} €</h2>

          <button
            className="clear-btn"
            onClick={() => {
              localStorage.removeItem("cart");
              setCart([]);
            }}
          >
            Vider le panier
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;

cart.css
--------
.cart-container {
  padding: 20px;
  max-width: 500px;
  margin: auto;
}

.cart-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
}

.clear-btn {
  background: red;
  color: white;
  padding: 10px 15px;
  border: none;
  margin-top: 20px;
  border-radius: 8px;
  cursor: pointer;
}

Ajoute ceci dans Product.jsx, juste avant return :
----------------------------------------------------

function addToCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Produit ajouté !");
}

Puis modifie ton bouton :
---------------------------

<button onClick={addToCart}>
  Ajouter au panier
</button>

Et dans App.jsx ajouter  :
--------------------------------------

import Cart from "./pages/Cart";

{/* PAGE PANIER */}
<Route path="/cart" element={<Cart />} />

--------------------------------------------

Ajouter ceci à Home.jsx pour accéder au panier
-------------------------------------------

<button onClick={() => window.location.href = "/cart"}>
  🛒 Panier
</button>

tester voter panier en ajoutant et supprimant

Modidfier app.jsx
------------------

Changer ceci : import { BrowserRouter, Routes, Route } from "react-router-dom";

et ceci :

      <Routes>
        ...
      </Routes>

Dans Product.jsx
-----------------
Pous être dans les bonnes pratiques de REACT on va changer la function du panier pour l'immutabilité

  function handleAddToCart() {
    // 1. Récupérer le panier actuel
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    // 2. Ajouter le produit courant
    const newCart = [...currentCart, product];

    // 3. Sauvegarder
    localStorage.setItem("cart", JSON.stringify(newCart));

    // 4. Feedback simple
    alert("Produit ajouté au panier");
  }

🧠 Notion d’immutabilité 
--------------------------
- Muter une variable = la modifier directement (ex : cart.push(...)).
- Immutabilité = on ne modifie pas l’ancienne valeur, on crée une nouvelle valeur à partir de l’ancienne.
- Dans notre cas :
  - cart.push(product) → on modifie le tableau original.
  - [...currentCart, product] → on crée un nouveau tableau qui contient l’ancien + le produit.
  - Pourquoi c’est mieux dans un projet React ?
    - React aime bien les données immutables :
    - Plus simple à comprendre
    - Plus facile à déboguer
    - Plus proche des “bonnes pratiques” modernes
    - On s’habitue tout de suite aux bons réflexes pour la suite :
      - state React (useState)
      - Redux / autres libs qui reposent sur l’immutabilité

Pour la suite nous devons ammélioré server.js :
------------------------------------------------

const express = require('express');
const cors = require('cors');
const fs = require('fs'); //lecture écriture des fichiers JSON
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Chemin vers le fichier JSON des produits
const PRODUCTS_FILE = path.join(__dirname, 'products.json');

// 🔹 Lire les produits depuis le fichier à chaque requête
function readProducts() {
  try {
    const raw = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Erreur lecture products.json :', err);
    return [];
  }
}

// 🔹 Écrire les produits dans le fichier (si tu veux ajouter / modifier plus tard)
function writeProducts(products) {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
  } catch (err) {
    console.error('Erreur écriture products.json :', err);
  }
}

// =======================
//   ROUTES PRODUITS
// =======================

// ➜ Tous les produits
app.get('/products', (req, res) => {
  // On demande au navigateur de NE PAS mettre en cache
  res.set('Cache-Control', 'no-store');

  const products = readProducts();
  res.json(products);
});

// ➜ Un seul produit par id (utile si tu veux l’utiliser plus tard)
app.get('/products/:id', (req, res) => {
  res.set('Cache-Control', 'no-store');

  const products = readProducts();
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Produit non trouvé' });
  }

  res.json(product);
});

// ➜ Ajouter un produit (pour plus tard si tu veux tester l’écriture)
app.post('/products', (req, res) => {
  const products = readProducts();
  const newProduct = req.body;

  if (!newProduct.name || typeof newProduct.price !== 'number') {
    return res.status(400).json({ error: 'name (string) et price (number) sont obligatoires' });
  }

  // Génération d’un nouvel id
  newProduct.id = products.length
    ? Math.max(...products.map(p => p.id)) + 1
    : 1;

  products.push(newProduct);
  writeProducts(products);

  res.status(201).json(newProduct);
});

// =======================
//   LANCEMENT DU SERVEUR
// =======================
app.listen(port, () => {
  console.log("API running on http://localhost:" + port);
});

👉 Ce que ça change concrètement :
------------------------------------
- fs sert toujours à lire/écrire le fichier → tu gardes la possibilité de modifier / ajouter des produits dans products.json sans BDD SQL.
- À chaque GET /products, le serveur relit le fichier → si tu modifies products.json, un simple F5 dans le navigateur suffit.
- Le header Cache-Control: no-store évite au navigateur de conserver une vieille version de la réponse.
- Tu pourras plus tard utiliser POST /products (par Postman par ex.) pour tester l’ajout d’articles et voir qu’ils sont bien enregistrés dans le fichier.

/!\ - A ce stade couper les serveurs et les relancer back et front
- CTRL C dans  le terminal de chacun
- rafraichir la page dans l'explorateur

Maintenant on amméliore le main.jsx (noté les diféfrences et faites des recherches dessus)
-------------------------------------------------------------------------------------------

// frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

On amméliore également Home.jsx
--------------------------------

// frontend/src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/products", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => setError(err.toString()));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Produits</h1>

      <button onClick={() => (window.location.href = "/cart")}>🛒 Panier</button>

      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}

      {products.length === 0 && !error && <p>Chargement...</p>}

      {products.map((p) => (
        <Link
          key={p.id}
          to={`/product/${p.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              margin: "10px",
              borderRadius: "8px",
              display: "block",
            }}
          >
            <h3>{p.name}</h3>
            <strong>{p.price} €</strong>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Home;


On amméliore Product.jsx
-------------------------

// frontend/src/pages/Product.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Product.css";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Produit introuvable");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.toString()));
  }, [id]);

  if (error) return <p style={{ color: "red" }}>Erreur : {error}</p>;
  if (!product) return <p>Chargement...</p>;

  function handleAddToCart() {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const newCart = [...currentCart, product]; // immutabilité
    localStorage.setItem("cart", JSON.stringify(newCart));
    alert("Produit ajouté au panier");
  }

  return (
    <div className="product-card">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <h2>{product.price} €</h2>

      <button onClick={handleAddToCart}>Ajouter au panier</button>
    </div>
  );
}

export default Product;

------------------------

Ajoutons une barre de navigation :
-----------------------------------

Dans notre fichier App.jsx, ajoutons la barre de navigation :
---------------------------------------------------------------

import NavBar from "./components/NavBar";

et de suite aprés la parenthèse ouvrante du return ceci

    <>
      <NavBar />

      et aprés </BrowserRouter>
      ajouter ceci
    </>

-----------------

⚠️ Important : NavBar est au-dessus des <Routes>, comme ça elle reste affichée sur toutes les pages.

Créer la barre de Menu :
-------------------------
📁 Crée le dossier frontend/src/components/, puis le fichier NavBar.jsx :
Ajoutez-y ce code
------------------------------------------------

import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        🏠 Accueil
      </Link>

      <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
        🛒 Panier
      </Link>
    </nav>
  );
}

export default NavBar;

-------------------------------

CSS de la barre de menu
------------------------

📄 frontend/src/components/Navbar.css
--------------------------------------
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: #111;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
}

.navbar-left,
.navbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.navbar-logo {
  font-weight: 700;
  font-size: 1.2rem;
  text-decoration: none;
  color: #61dafb;
}

.nav-link {
  text-decoration: none;
  color: #fff;
  font-size: 0.95rem;
}

.nav-link:hover {
  text-decoration: underline;
}

--------------------------------

Nettoyer le bouton panier dans Home.jsx
----------------------------------------

Comme la barre de navigation a déjà un lien “Panier”, on peu retirer ce bouton pour ne pas surcharger.

/!\ TIPS : Quand vosu avez une erreur ou un disfonctionement penser avant tout à relancer le backend et le frontend avant de corriger voter code.

Créons une connection utilisateur :
-------------------------------------

Dans le dossier backend Créer un un fichier users.json

Y entrer ceci :

[
  {
    "id": 1,
    "email": "demo@boutique.test",
    "password": "secret",
    "name": "Visiteur"
  }
]

----------------------
Pour l’instant : mot de passe en clair.
Plus tard on le cryptera avec BCRYPT.

On complète server.js (rajouter à la suite dans la bonne partie de votre server.js ces codes)
----------------------------------------------------------------------------------------------

// Chemin vers le fichier JSON des utilisateurs
const USERS_FILE = path.join(__dirname, 'users.json');

----------------------------------------------------------------------------------------------

// ---------- UTIL USERS ----------
function readUsers() {
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Erreur lecture users.json :', err);
    return [];
  }
}

----------------------------------------------------------------------------------------------

// =======================
//   ROUTE LOGIN SIMPLE
// =======================

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ ok: false, message: "email et password sont obligatoires" });
  }

  const users = readUsers();
  const user = users.find(u => u.email === email);

  if (!user || user.password !== password) {
    return res.status(401).json({ ok: false, message: "Email ou mot de passe invalide" });
  }

  return res.json({
    ok: true,
    user: { id: user.id, email: user.email, name: user.name }
  });
});


----------------------------------------------------------------------------------------------

On ajoute la connextion au menu en modifiant NavBar.jsx
---------------------------------------------------------

import { Link, useNavigate } from "react-router-dom";

---------------------------------------------------------

function NavBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/");
  }
---------------------------------------------------------

<nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Boutique</Link>
        <Link to="/cart">Panier</Link>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>
              Bonjour, {user.name}
            </span>
            <button onClick={handleLogout}>Se déconnecter</button>
          </>
        ) : (
          <Link to="/login">Se connecter</Link>
        )}
      </div>
    </nav>

---------------------------------------------------------

.navbar a {
  color: white;
  margin-right: 15px;
  text-decoration: none;
}

.navbar button {
  background: #555;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

----------------------------------------------------------------------------------------------


On ajoute la page login.jsx dans pages
--------------------------------------

// frontend/src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("demo@boutique.test");
  const [password, setPassword] = useState("secret");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Erreur de connexion");
      }

      // On stocke l'utilisateur en localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      // Retour à l'accueil
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h1>Connexion</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Email<br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Mot de passe<br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%" }}
            />
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>
        Identifiants de test : <br />
        <code>demo@boutique.test / secret</code>
      </p>
    </div>
  );
}

export default Login;

-------------------------------

On complète app.jsx
--------------------

import Login from "./pages/Login";

--------------------

<Route path="/login" element={<Login />} />

----------------------------------------------------------------------------------------------

Tester maintenant le compte utilisateur !

----------------------------------------------------------------------------------------------

On va crypter le mot de passe maintenant !
--------------------------------------------
Dans le dossier backend/ :

npm install bcrypt

-----------------------------------------
Modifier server.js pour générer un hash

👉 TEMPORAIRE : ajoute ceci juste une fois pour créer un hash :

const bcrypt = require("bcrypt");

// GÉNÉRER UN HASH POUR METTRE DANS users.json
// ces deux lignes sont à éffacer aprés cette action.
const hash = bcrypt.hashSync("secret", 10);
console.log("Hash du password :", hash);

Lance :

node server.js


Tu récupères une valeur du style dans le terminal :

$2b$10$Lm0Yy6yDv5FyK...


➡️ Tu l’insères dans ton users.json :

[
  {
    "id": 1,
    "email": "demo@boutique.test",
    "password": "$2b$10$Lm0Yy6yDv5FyK...", 
    "name": "Visiteur"
  }
]

---------------------------------

On remplace app.post dans server.js entièrement pour ajouter bcrypt
------------------------------------------------------

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ ok: false, message: "email et password sont obligatoires" });
  }

  const users = readUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({ ok: false, message: "Email ou mot de passe invalide" });
  }

  // Vérifie le mot de passe hashé
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({ ok: false, message: "Email ou mot de passe invalide" });
  }

  return res.json({
    ok: true,
    user: { id: user.id, email: user.email, name: user.name }
  });
});

-----------------------------------------------

Objectif suivant. (sachant qu'actuellement le panier reste actif aprés déconnexion)
----------------------------------------------------------------------------------

déplacer le panier côté backend.
C’est propre, sécurisé et ça évite que le panier reste après déconnexion.

🎯 Objectif

👉 Chaque utilisateur aura son panier enregistré dans users.json
👉 Le panier ne dépend plus du navigateur
👉 Il est automatiquement associé lors du login
👉 Il disparaît quand on change de compte

📌 ÉTAPE 1 — Ajouter un champ cart dans users.json
---------------------------------------------------

Modifie ton fichier pour ajouter un tableau vide :

    "cart": []


📌 ÉTAPE 2 — Ajouter une route backend pour récupérer le panier
----------------------------------------------------------------

(Quand l’utilisateur se connecte)

Dans server.js, après /login, ajoute :

app.get('/cart/:userId', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === Number(req.params.userId));

  if (!user) {
    return res.status(404).json({ ok: false, message: "Utilisateur non trouvé" });
  }

  res.json({ ok: true, cart: user.cart || [] });
});

✅ ÉTAPE 3 — Ajouter la route pour ENREGISTRER le panier dans le backend
--------------------------------------------------------------

👉 Cette route permet au frontend d’envoyer un panier mis à jour
(ajout, suppression, quantité, etc.)
et de le stocker dans users.json.

📌 Action à faire dans server.js :

➡️ Ajoute ce code juste sous la route GET /cart/:userId :
----------------------------------------------------------

app.post('/cart/:userId', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === Number(req.params.userId));

  if (!user) {
    return res.status(404).json({ ok: false, message: "Utilisateur non trouvé" });
  }

  // Mise à jour du panier
  user.cart = req.body.cart || [];

  // On réécrit le fichier users.json avec le panier mis à jour
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.json({ ok: true, cart: user.cart });
});

-------------------
🎯 Résultat obtenu après cette étape :

✔ Tu peux récupérer le panier d’un utilisateur
✔ Et tu peux enregistrer un panier mis à jour dans users.json
-------------------

📝 Rappel important

Ton users.json doit déjà ressembler à :
[
  {
    "id": 1,
    "email": "demo@boutique.test",
    "password": "...hash...",
    "name": "Visiteur",
    "cart": []
  }
]

-----------------------------
✅ ÉTAPE 4 — Récupérer le panier backend AU MOMENT DE LA CONNEXION

Quand l’utilisateur se connecte, ton frontend doit :

1️⃣ Stocker l'utilisateur dans localStorage
2️⃣ Appeler l'API backend pour récupérer son panier
3️⃣ Enregistrer ce panier dans localStorage

-----------------------------
C'est quoi localstrorage ?
[C'est quoi localstrorage ?](README_LOCALSTORAGE.md)
-----------------------------

🎯 Action à faire dans ton fichier Login.jsx

Dans le bloc où tu traites la connexion réussie :

Tu dois avoir quelque chose comme :

localStorage.setItem("user", JSON.stringify(data.user));
navigate("/");


On va insérer la récupération du panier juste avant navigate("/").

📌 Ajoute ce code AVANT le navigate("/") :
// On récupère le panier du backend pour cet utilisateur
const cartRes = await fetch(`http://localhost:3001/cart/${data.user.id}`);
const cartData = await cartRes.json();

// On stocke le panier dans localStorage
localStorage.setItem("cart", JSON.stringify(cartData.cart));

-----------------------

Dans NavBar.jsx remplace tout par
-----------------------------------

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  // 🔄 Se met à jour à chaque changement de page
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);
  }, [location]);

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setUser(null);
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Boutique</Link>
        <Link to="/cart">Panier</Link>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>
              Bonjour, {user.name}
            </span>
            <button onClick={handleLogout}>Se déconnecter</button>
          </>
        ) : (
          <Link to="/login">Se connecter</Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;

--------------------------------

Dans Cart.jsx remplace completement :
---------------------------------------
useEffect(() => {...});

par ceci :

useEffect(() => {
    // Fonction pour recharger le panier
    const updateCart = () => {
        const stored = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(stored);
    };

    // Charger au démarrage
    updateCart();

    // Mettre à jour si localStorage change ailleurs (login, ajout panier…)
    window.addEventListener("storage", updateCart);

    return () => {
        window.removeEventListener("storage", updateCart);
    };
}, []);

------------------------

🔍 Résultat après login :

Ton app aura automatiquement :

localStorage.user → l’utilisateur connecté

localStorage.cart → son panier backend

Et tu ne liras plus jamais les vieux paniers d’un autre utilisateur.

🧪 TEST (à faire après cette étape)

Clique sur Déconnexion

Vérifie que localStorage.cart disparaît

Reconnecte-toi

Regarde la console → tu dois voir le panier venir du backend

le problème que l’on corrige maintenant

Pour que le panier revienne automatiquement après connexion, il faut modifier Cart.jsx et ajouter un écouteur qui recharge le panier quand localStorage.

cart.jsx complet ci-dessous:
--------------------------------

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Cart.css";

function Cart() {
    const [cart, setCart] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(stored);
    }, [location]); // 🔥 se relance après login, logout, navigation

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="cart-container">
            <h1>Mon Panier</h1>

            {cart.length === 0 && <p>Votre panier est vide.</p>}

            {cart.map((item, index) => (
                <div key={index} className="cart-item">
                    <h3>{item.name}</h3>
                    <p>{item.price} €</p>
                </div>
            ))}

            {cart.length > 0 && (
                <>
                    <h2>Total : {total.toFixed(2)} €</h2>
                    <button
                        className="clear-btn"
                        onClick={() => {
                            localStorage.removeItem("cart");
                            setCart([]);
                        }}
                    >
                        Vider le panier
                    </button>
                </>
            )}
        </div>
    );
}

export default Cart;

----------------------------
et modififier également Product.jsx
------------------------------------

VERSION CORRECTE DE Product.jsx (à remplacer ENTIEREMENT)
-----------------------------------------------------------
// frontend/src/pages/Product.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Product.css";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Produit introuvable");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.toString()));
  }, [id]);

  if (error) return <p style={{ color: "red" }}>Erreur : {error}</p>;
  if (!product) return <p>Chargement...</p>;

  function addToCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produit ajouté !");
  }

  return (
    <div className="product-card">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <h2>{product.price} €</h2>

      <button onClick={addToCart}>
        Ajouter au panier
      </button>
    </div>
  );
}

export default Product;

------------------

ÉTAPE 1 : AJOUTE CECI DANS server.js

➡️ JUSTE AVANT app.listen(...)

// =======================
//   ROUTES PANIER
// =======================

// ➜ Récupérer le panier d'un utilisateur
app.get("/cart/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const users = readUsers();

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ ok: false, message: "Utilisateur introuvable" });
  }

  res.json({ ok: true, cart: user.cart || [] });
});

// ➜ Sauvegarder le panier d'un utilisateur
app.post("/cart/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const { cart } = req.body;

  const users = readUsers();
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ ok: false, message: "Utilisateur introuvable" });
  }

  users[userIndex].cart = cart;
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.json({ ok: true, cart });
});

-------------------

ÉTAPE 2 : Ajouter la sauvegarde du panier dans addToCart()

Dans Product.jsx, modifie addToCart :

function addToCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    fetch(`http://localhost:3001/cart/${user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart })
    });
  }

  alert("Produit ajouté !");
}

---------------------

Nous allons nous arrêter ici !

React ne permet pas de metter en ligne un site il doit TRANSPILLER le code pour qu'il fonctionne en ligne.

On arrête la démo ici, et tu veux maintenant déployer ton projet React + Node “comme en ligne”, mais dans un autre dossier sur le même localhost.

🎯 Objectif pédagogique :
Simuler un vrai déploiement comme sur un hébergement, sans utiliser npm run dev, mais une version BUILD (optimisée), avec backend séparé.

On va le faire proprement, simple et pro.

🟦 Déploiement LOCAL “COMME EN LIGNE”

Tu vas obtenir :
C:\...\www\SAND_BOX_PLATEFORME\REACT2\deploy\
    backend\
    frontend\


Backend = serveur Node Express
Frontend = fichiers HTML/CSS/JS compilés (comme sur un serveur)

🟩 ÉTAPE 1 — Construire la version finale du FRONT

Dans ton dossier :
frontend/

Lance :
npm run build


Ça génère un dossier :
frontend/dist/


➡️ C’est TON site final, optimisé, sans React DevTools, sans source maps, 100% production.

🟩 ÉTAPE 2 — Créer un dossier de déploiement

Crée un dossier :
deploy/


Puis dedans :
deploy/backend/
deploy/frontend/


Copie :
✔ Ton backend complet (server.js + users.json + products.json + node_modules ?) → NON, on reinstallera
dans deploy/backend/
✔ Le contenu de frontend/dist/
dans deploy/frontend/
(par exemple index.html, assets/, etc.)

----------------------------

🟩 ÉTAPE 3 — Installer le backend dans le dossier de déploiement

Dans :
deploy/backend/


Copie uniquement :
server.js
products.json
users.json
package.json

Puis install :
npm install

Tu obtiens un backend propre, indépendant.

🟩 ÉTAPE 4 — Modifier le backend pour servir le build du frontend

Dans deploy/backend/server.js, juste avant app.listen(...), ajoute :

const path = require("path");

// Servir le frontend buildé
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});


🔥 Ce code simule EXACTEMENT un hébergement web.

🟩 ÉTAPE 5 — Lancer le backend comme un vrai serveur

Dans :
deploy/backend/


Lancer ton API :
node server.js


🎉 Ton site final est maintenant accessible sur :
http://localhost:3001/


Et affichera le build React comme en production.

🟦 ÉTAPE 6 — Explication aux étudiants (version simple à expliquer)

Voici ce qu’ils doivent retenir :
🌐 1. En production, on ne lance PAS React avec npm run dev.

On construit le site :
npm run build


Ça génère un site statique prêt à être mis en ligne.

🖥️ 2. Le backend doit servir ces fichiers

Comme le ferait :
Apache
Nginx
Un hébergeur mutualisé
OVH / o2switch / AlwaysData

🏗️ 3. On installe le backend dans un dossier séparé

Comme s’il était sur un autre serveur.

🚀 4. On lance le serveur Node
node server.js


Et tout fonctionne comme dans un vrai déploiement.

🟩 Résultat final

Vous obtenez une simulation parfaite d’un site en ligne :
Backend Node actif
Frontend buildé
Un seul port (3001)
Aucune dépendance dev
Pas de hot reload
Pas de source map
Site optimisé comme en ligne