# Stockages Web : LocalStorage / SessionStorage / Cookies

## Qu’est‑ce que le LocalStorage ?
Le **LocalStorage** est un espace de stockage intégré au navigateur.  
Il permet d’enregistrer des données de manière **persistante** : elles restent même après avoir fermé le navigateur ou redémarré l’ordinateur.  
Il fonctionne sous forme de **clé / valeur** et accepte environ **5 Mo** de données.

### Exemple
```js
localStorage.setItem("theme", "dark");
localStorage.getItem("theme");
localStorage.removeItem("theme");
localStorage.clear();
```

---

## Qu’est‑ce que le SessionStorage ?
Le **SessionStorage** fonctionne comme le LocalStorage mais les données disparaissent dès que **l’onglet est fermé**.  
Il sert pour stocker des informations **temporaires**, uniquement le temps de la session.

### Exemple
```js
sessionStorage.setItem("step", "2");
sessionStorage.getItem("step");
sessionStorage.removeItem("step");
```

---

## Qu’est‑ce qu’un Cookie ?
Un **cookie** est une petite donnée (≈ 4 Ko) enregistrée dans le navigateur.  
Contrairement au LocalStorage, les cookies sont **automatiquement envoyés au serveur** à chaque requête, ce qui les rend utiles pour :  
- l’authentification  
- la gestion des sessions  
- des préférences utilisées côté serveur  

Les cookies peuvent avoir une **date d’expiration**.

### Exemple
```js
document.cookie = "user=Pierre; max-age=" + 7*24*60*60;
console.log(document.cookie);
document.cookie = "user=; max-age=0";
```

---

## Tableau comparatif

|                   | LocalStorage          | SessionStorage         | Cookies                      |
|-------------------|-----------------------|------------------------|------------------------------|
| Durée             | Permanent             | Fermeture de l’onglet  | Expiration définie           |
| Taille            | ~5 Mo                 | ~5 Mo                  | ~4 Ko                        |
| Envoyé au serveur | ❌ Non               | ❌ Non                 | ✅ Oui                       |
| Usage typique     | Thèmes, préférences   | Progression temporaire | Authentification, sessions   |


LocalStorage = un petit espace de stockage dans le navigateur.

Définition simple :
➡️ LocalStorage permet d’enregistrer des données dans le navigateur, qui restent même après avoir fermé la page ou éteint l’ordinateur.

Caractéristiques principales :

Stockage persistant : les données restent tant qu’on ne les supprime pas.

Clé / valeur : on stocke des paires "clé" : "valeur".

Taille limitée : environ 5 Mo par site.

Accessible seulement côté client (JavaScript).

Uniquement du texte : si tu veux stocker un objet → tu dois utiliser JSON.stringify().

Exemple très court :

// Stocker
localStorage.setItem("prenom", "Pierre");

// Lire
const p = localStorage.getItem("prenom");
console.log(p); // "Pierre"

// Supprimer
localStorage.removeItem("prenom");

// Tout vider
localStorage.clear();

comparaison localStorage / sessionStorage / cookies.

Voici la comparaison simple et directe :

🔶 LocalStorage

Durée : permanent (reste après fermeture du navigateur)

Taille : ~ 5 Mo

Accessible : JavaScript seulement

Envoi au serveur : non

Usage : préférences, thème, panier simple, sauvegardes locales

🔷 SessionStorage

Durée : disparaît quand l’onglet se ferme

Taille : ~ 5 Mo

Accessible : JavaScript seulement

Envoi au serveur : non

Usage : données temporaires d'une session, état d’un formulaire, étape d’un jeu

🔶 Cookies

Durée : définie par un délai (ex : 7 jours)

Taille : 4 Ko (très petit)

Accessible : JavaScript et envoyé au serveur à chaque requête

Envoi au serveur : oui

Usage : authentification, préférences envoyées au backend, sessions utilisateurs

Usage typique : Panier, thème, préférences, Progression temporaire, Auth, tracking, sessions


Quel type choisir selon ton cas, ou un exemple d’utilisation pour ton Serious Game ou un système de login.
----------------------------------------------------------------------------------------------------------

✅ 1. Tu veux garder une info même après fermeture du navigateur

→ LocalStorage
Exemples : thème sombre, volume d’un jeu, panier simple, dernière page ouverte.

✅ 2. Tu veux garder une info seulement tant que l’onglet est ouvert

→ SessionStorage
Exemples : étapes d’un formulaire, progression temporaire, données sensibles à courte durée.

✅ 3. Tu veux que le serveur reçoive l’information automatiquement

→ Cookies
Exemples : connexion utilisateur (token), préférences à envoyer au backend, gestion de sessions PHP.

Exemples de code
🔶 LocalStorage
➤ Stocker une valeur
localStorage.setItem("theme", "dark");

➤ Lire une valeur
const theme = localStorage.getItem("theme");
console.log(theme);

➤ Supprimer une valeur
localStorage.removeItem("theme");

➤ Tout vider
localStorage.clear();

🔷 SessionStorage
➤ Stocker
sessionStorage.setItem("step", "2");

➤ Lire
const step = sessionStorage.getItem("step");
console.log(step);

➤ Supprimer
sessionStorage.removeItem("step");

🍪 Cookies
➤ Créer un cookie (expire dans 7 jours)
document.cookie = "user=Pierre; max-age=" + 7 * 24 * 60 * 60;

➤ Lire les cookies
console.log(document.cookie);

➤ Supprimer un cookie
document.cookie = "user=; max-age=0";