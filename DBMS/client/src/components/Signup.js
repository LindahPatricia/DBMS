import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
      setMessage('Signup successful! You can now log in.');
      navigate('/dashboard');
    } catch (error) {
      setMessage('Signup failed. Check your details.');
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f8ff',
    padding: '20px',
  };

  const formStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
  };

  const titleStyle = {
    fontSize: '2rem',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#4CAF50',
  };

  const inputStyle = {
    width: '100%',
    padding: '15px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1rem',
    transition: 'border-color 0.3s',
  };

  const buttonStyle = {
    width: '100%',
    padding: '15px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const messageStyle = {
    textAlign: 'center',
    color: 'red',
    marginTop: '20px',
  };

  const linkStyle = {
    textAlign: 'center',
    marginTop: '15px',
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={titleStyle}>Signup</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Signup</button>
        {message && <p style={messageStyle}>{message}</p>}
        <div style={linkStyle}>
          <p>Already have an account? <Link to="/login" style={{ color: '#4CAF50', textDecoration: 'none' }}>Login</Link></p>
          <p><Link to="/" style={{ color: '#4CAF50', textDecoration: 'none' }}>Back to Home</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
