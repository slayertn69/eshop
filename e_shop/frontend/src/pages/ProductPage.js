import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`/api/products/${id}/`).then(response => setProduct(response.data));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} />
            <p>{product.description}</p>
            <p>${product.price}</p>
        </div>
    );
};

export default ProductPage;
