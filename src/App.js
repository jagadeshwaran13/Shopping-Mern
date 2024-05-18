import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
//import ReduxProvider from './CartContext';
import { CartProvider } from './screen/CartContext'; 
import Home from './screen/Home';
import Login from './screen/Login';
import Signup from './screen/Signup';
import './App.css';
import ProductList from './screen/ProductList';
import ProductDetails from './screen/ProductDetails';
import Cart from './screen/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <CartProvider>
      <div className="App">
        <Router>
          <header className="App-header">
            <nav>
              <ul className="navbar">
                <li className="nav-item left-content">
                  <Link to="/home">Online Shopping</Link>
                </li>
                <li className="nav-item right-content">
                  <Link to="/categories">Categories</Link>
                </li>
                <li className="nav-item right-content">
                  <Link to="/login">Login</Link>
                </li>
                <li className="nav-item right-content">
                  <Link to="/signup">Signup</Link>
                </li>
                <li className="nav-item right-content">
                  <Link to="/cart">Cart</Link>
                </li>
              </ul>
            </nav>
          </header>

          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/categories" element={<ProductList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </Router>
        <footer>
         <h3>About Us</h3>
          <h4>Online Shopping</h4>
          <div className="text-center">"Explore a world of convenience with our online shopping platform. Discover quality products, seamless transactions, and exceptional service right at your fingertips."</div>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
