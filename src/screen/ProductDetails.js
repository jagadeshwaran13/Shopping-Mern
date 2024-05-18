// ProductDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert('Product added to cart!');
    }
  };

  if (!product) {
    return <div className="loading-text">Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.title} className="product-image" />
        </div>
        <div className="col-md-6">
          <h1>{product.title}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-category">Category: {product.category}</p>
          <p className="product-price">Price: ${product.price}</p>
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
