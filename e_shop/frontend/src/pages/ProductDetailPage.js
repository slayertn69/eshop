import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetailPage = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);
        setProduct(response.data.product);
      } catch (error) {
        console.error("Erreur lors du chargement du produit", error);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (!product) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      {product.image && (
        <img src={`http://localhost:8000${product.image}`} alt={product.name} />
      )}
      <p>{product.description}</p>
      <p><strong>{product.price} €</strong></p>
    </div>
  );
};

export default ProductDetailPage;
