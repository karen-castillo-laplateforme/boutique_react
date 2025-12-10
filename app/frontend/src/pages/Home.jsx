import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/products", { cache: "no-store" })
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch((err) => setError(err.toString()));
  }, []);

  return (
    <div>
      <h1>Produits</h1>

      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}

      {products.length === 0 && <p>Chargement...</p>}
      {products.map(p => (
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
        display: "block"
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