
import React from 'react';
import styles from './ProductCard.module.css';
import { useCart } from './CartContext'; 

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className={styles.productCard}>
      <h3>{product.title}</h3>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
