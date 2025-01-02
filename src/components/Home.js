import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Customer Management</h1>
      <div className="home-buttons">
        <button className="home-button" onClick={() => navigate('/add-customer')}>
          Add a New Customer
        </button>
        <button className="home-button">
          Update Existing Record
        </button>
        <button className="home-button" onClick={() => navigate('/calculate-premium')}>
          Calculate Premium
        </button>
      </div>
    </div>
  );
}

export default Home;
