    const express = require('express');
    const cors = require('cors');
    const fs = require('fs');

    const app = express();
    const port = 3001;

    app.use(cors());
    app.use(express.json());

    // Lire les produits depuis le fichier JSON
    const products = JSON.parse(fs.readFileSync('./products.json', 'utf8'));
    console.log(products);

    // ROUTE PRODUITS
    app.get('/products', (req, res) => {
      res.json(products);
    });

    app.listen(port, () => {
      console.log("API running on http://localhost:" + port);
    });