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
    </div>
  );
}

export default Home;