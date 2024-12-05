import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CataloguePage.css';
import { Link } from 'react-router-dom'; 

const CataloguePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    'Electronics', 'Laptops', 'Arts', 'Food', 'Home', 'Kitchen',
  ]); 
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    brand: '',
    min_price: '',
    max_price: '',
  });
  const [pagination, setPagination] = useState({ next: null, previous: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = (url = "http://127.0.0.1:8000/api/products/") => {
    setLoading(true);
    axios
      .get(url, { params: filters })
      .then((response) => {
        if (response.data.results) {
          setProducts(response.data.results.products); 
          setPagination({ next: response.data.results.next, previous: response.data.results.previous });
        } else {
          setError("Aucun produit trouvé.");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Une erreur s'est produite lors du chargement des produits.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handlePagination = (url) => {
    if (url) fetchProducts(url);
  };

  return (
    <div className="catalogue-container">
      <h1>Catalogue des Produits</h1>

      <div className="filters">
        <input
          type="text"
          name="keyword"
          placeholder="Rechercher un produit..."
          value={filters.keyword}
          onChange={handleFilterChange}
        />
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="text"
          name="brand"
          placeholder="Marque"
          value={filters.brand}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="min_price"
          placeholder="Prix min"
          value={filters.min_price}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="max_price"
          placeholder="Prix max"
          value={filters.max_price}
          onChange={handleFilterChange}
        />
        <button onClick={() => fetchProducts()}>Appliquer les Filtres</button>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <h2>{product.name}</h2>
              {product.image && (
                <img src={`http://localhost:8000${product.image}`} alt={product.name} />
              )}
              <p>{product.description}</p>
              <p><strong>{product.price} €</strong></p>
              <Link to={`/product/${product.id}`}>Voir les détails</Link> 
            </div>
          ))}
        </div>
      )}

      <div>
        {pagination.previous && (
          <button onClick={() => handlePagination(pagination.previous)}>Précédent</button>
        )}
        {pagination.next && (
          <button onClick={() => handlePagination(pagination.next)}>Suivant</button>
        )}
      </div>
    </div>
  );
};

export default CataloguePage;
