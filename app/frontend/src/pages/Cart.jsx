import { useEffect, useState } from "react";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // On lit simplement le LocalStorage
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
    
    if (user) {
    fetch(`http://localhost:3001/cart/${user.id}`, { cache: "no-store" })
    .then((res) => {
        if (!res.ok) throw new Error("Produit introuvable");
        return res.json();
      })
      .then((data) => setCart(data.cart || []))
      .catch((err) => setError(err.toString()));
  }
  }, []);

  // Calcul du total
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  
//   Fonction pour vider le panier (Local + Serveur)
  function handleClearCart() {
    // A. Vider le local
    localStorage.removeItem("cart");
    setCart([]);

    // B. Vider le serveur (si connecté)
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      fetch(`http://localhost:3001/cart/${user.id}`, {
        method: "POST", // On utilise POST pour écraser le panier
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: [] }), // On envoie un tableau vide !
      }).catch(err => console.error("Erreur vidage panier server", err));
    }
  }

  if (error) return <p style={{ color: "red" }}>Erreur : {error}</p>;

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
            onClick={handleClearCart}
          >
            Vider le panier
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;