import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Product.css";

function Product() {
  const { id } = useParams();            // récupère l'id dans l'URL
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

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const newCart = [...cart, product];
  localStorage.setItem("cart", JSON.stringify(newCart));

  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    fetch(`http://localhost:3001/cart/${user.id}`, {  
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({cart: newCart}), 
    });
  }

  alert("Produit ajouté au panier !");

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