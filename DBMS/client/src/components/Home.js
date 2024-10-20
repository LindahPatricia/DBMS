import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Define inline styles
  const containerStyle = {
    textAlign: 'center',
    marginTop: '50px',
    backgroundColor: '#f0f8ff', // Light background color
    padding: '20px', // Add some padding
    borderRadius: '10px', // Rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Soft shadow
  };

  const headerStyle = {
    fontSize: '2.5rem', // Large header font size
    color: '#4CAF50', // Green color
  };

  const paragraphStyle = {
    fontSize: '1.2rem', // Medium font size
    color: '#555', // Dark gray color
    marginBottom: '40px', // Space below the paragraph
  };

  const linkStyle = {
    margin: '10px',
    textDecoration: 'none',
    color: 'white', // Text color for buttons
    padding: '15px 25px', // Padding inside the buttons
    fontSize: '1rem', // Font size for the buttons
    backgroundColor: '#4CAF50', // Button background color
    border: 'none', // No border
    borderRadius: '5px', // Rounded corners
    cursor: 'pointer', // Pointer cursor on hover
    transition: 'background-color 0.3s ease', // Smooth transition for hover effect
  };

  const hoverStyle = {
    ...linkStyle,
    backgroundColor: '#45a049', // Darker green on hover
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Welcome to the Driver Behavior Monitoring System</h1>
      <p style={paragraphStyle}>Your tool for monitoring and improving driver behavior.</p>
      <div>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/signup" style={linkStyle}>Sign Up</Link>
      </div>
    </div>
  );
};

export default Home;

