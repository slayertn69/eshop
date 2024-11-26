import React, { useState, useEffect } from 'react';
//import { fetchProducts } from '../services/api';
import axios from 'axios';

const CataloguePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((response) => {
        // Vérification si les données existent
        if (response.data && response.data.products) {
     //     console.log(response.data.products)
          setProducts(response.data.products);
        } else {
          setError("Aucun produit trouvé.");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Une erreur s'est produite lors du chargement des produits.");
      });
  }, []);
   console.log(products)
   //if (loading) return <p>Loading...</p>;

  return (
    
    <div>
      <h1>Product Catalogue</h1>
      <div>
        {products.length > 0?
          products.map(product => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <img src={`http://localhost:8000${product.image}`} alt={product.name} />
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        )):!error && <p>Aucun produit disponible pour le moment.</p>}
      </div>
    </div>
  );
};

export default CataloguePage;
