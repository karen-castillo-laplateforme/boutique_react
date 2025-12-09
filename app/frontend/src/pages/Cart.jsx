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