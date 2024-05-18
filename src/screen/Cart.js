// Cart.js
import React from 'react';
import { useCart } from './CartContext'; // Adjust the path accordingly
import './Cart.css'; // Import your custom CSS file

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, getProductById } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.map(item => {
        const product = getProductById(item.id); // Assuming you have a function to get product by ID
        return (
          <div key={item.id} className="cart-item">
            <div className="product-image">
              <img src={product.image} alt={product.title} />
            </div>
            <div>
              <p>
                <span className="item-title">{product.title}</span> - ${product.price} -
                <button className="quantity-btn" onClick={() => decreaseQuantity(item.id)}>-</button>
                <span className="item-quantity">{item.quantity}</span>
                <button className="quantity-btn" onClick={() => increaseQuantity(item.id)}>+</button>
              </p>
            </div>
          </div>
        );
      })}
      <p className="total-amount">Total Amount: ${calculateTotal()}</p>
    </div>
  );
};

export default Cart;