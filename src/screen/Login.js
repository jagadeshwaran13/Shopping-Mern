
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Use useNavigate hook to get access to navigation

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!login.trim() || !password.trim()) {
      setError('Please enter both login and password.');
      return;
    }

    // Strong password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must contain 6 to 10 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character.');
      return;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    if (!emailRegex.test(login)) {
      setError('Invalid email format. Please use a valid Gmail address.');
      return;
    }

    // Your login logic goes here
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(users => {
        const user = users.find(u => u.email === login && u.password === password);

        if (user) {
          console.log('Login successful!');
          // Redirect to the Home page after successful login
          navigate('/home');
        } else {
          setError('Invalid login credentials.');
        }
      })
      .catch(error => {
        setError('Error fetching user data.');
        console.error(error);
      });

    // Clear error and reset form
    setError('');
    setLogin('');
    setPassword('');
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login">Login (Gmail):</label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={handleLoginChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
