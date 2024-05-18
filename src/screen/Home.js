// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import { useCart } from './CartContext';
import { useCart } from './CartContext';
import styles from './Home.module.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-container">
      <h1>All products</h1>
      <div className={`${styles.homeContainer} row`}>
        {products.map((product) => (
          <div key={product.id} className={`${styles.productCard} col-md-3 mb-4`}>
            <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
              <img src={product.image} alt={product.title} className={`${styles.productImage} img-fluid`} />
              <h3>{product.title}</h3>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
            </Link>
            <button className="btn btn-primary" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
