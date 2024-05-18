import React, { Component } from 'react';
import axios from 'axios';
import styles from './ProductList.module.css';

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      categories: [],
      selectedCategory: null,
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      const categories = [...new Set(response.data.map((product) => product.category))];
      this.setState({
        products: response.data,
        categories,
        selectedCategory: null,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchProductsByCategory = async (category) => {
    try {
      const response = await axios.get(`http://localhost:3000/products?category=${category}`);
      console.log('API Response:', response.data);

      this.setState({
        products: response.data,
        selectedCategory: category,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  render() {
    const { products, categories, selectedCategory } = this.state;

    return (
      <div className={styles.productListContainer}>
        <h2>{selectedCategory ? `Products in ${selectedCategory} category` : 'All Products'}</h2>

        <div>
          {categories.map((category) => (
            <button key={category} onClick={() => this.fetchProductsByCategory(category)}>
              {category}
            </button>
          ))}
          <button onClick={() => this.fetchProducts()}>Show All</button>
        </div>

        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <h3>{product.title}</h3>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <img src={`http://localhost:3000${product.image}`} alt={product.title} />
            </div>
          ))
        )}
      </div>
    );
  }
}

export default ProductList;
