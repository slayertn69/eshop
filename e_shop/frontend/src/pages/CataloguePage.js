import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';

const CataloguePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Product Catalogue</h1>
      <div>
        {products.map(product => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <img src={`http://localhost:8000${product.image}`} alt={product.name} />
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CataloguePage;
