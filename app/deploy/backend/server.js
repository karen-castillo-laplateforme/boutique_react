const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require("bcrypt");

const app = express();

// 1. CONFIGURATION DU PORT (Vital pour le déploiement)
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 2. SERVIR LE FRONTEND
// On dit au serveur : "Les fichiers du site sont dans le dossier d'à côté ../frontend"
app.use(express.static(path.join(__dirname, '../frontend')));

// --- CONFIGURATION DES FICHIERS JSON ---
const PRODUCTS_FILE = path.join(__dirname, 'products.json');
const USERS_FILE = path.join(__dirname, 'users.json');

// --- FONCTIONS UTILITAIRES ---
function readProducts() {
  try {
    const raw = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Erreur lecture products.json :', err);
    return [];
  }
}

function writeProducts(products) {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
  } catch (err) {
    console.error('Erreur écriture products.json :', err);
  }
}

function readUsers() {
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Erreur lecture users.json :', err);
    return [];
  }
}

// --- ROUTES API ---

app.get('/products', (req, res) => {
  res.set('Cache-Control', 'no-store');
  const products = readProducts();
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  res.set('Cache-Control', 'no-store');
  const products = readProducts();
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) return res.status(404).json({ error: 'Produit non trouvé' });
  res.json(product);
});

app.post('/products', (req, res) => {
  const products = readProducts();
  const newProduct = req.body;
  if (!newProduct.name || typeof newProduct.price !== 'number') {
    return res.status(400).json({ error: 'name et price requis' });
  }
  newProduct.id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
  products.push(newProduct);
  writeProducts(products);
  res.status(201).json(newProduct);
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ ok: false, message: "Manquant" });

  const users = readUsers();
  const user = users.find(u => u.email === email);

  if (!user) return res.status(401).json({ ok: false, message: "Invalide" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ ok: false, message: "Invalide" });

  return res.json({ ok: true, user: { id: user.id, email: user.email, name: user.name } });
});

app.get('/cart/:userId', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === Number(req.params.userId));
  if (!user) return res.status(404).json({ ok: false, message: "User not found" });
  res.json({ ok: true, cart: user.cart || [] });
});

app.post('/cart/:userId', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === Number(req.params.userId));
  if (!user) return res.status(404).json({ ok: false, message: "User not found" });
  
  user.cart = req.body.cart || [];
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  res.json({ ok: true, cart: user.cart });
});

// 3. CATCH-ALL ROUTE (Doit ABSOLUMENT être à la fin)
// Si aucune route API au-dessus n'a répondu, on renvoie le site React.
// J'utilise (.*) au lieu de * pour être compatible avec ta version de Node.
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// LANCEMENT
app.listen(port, () => {
  console.log("Server running on port " + port);
});