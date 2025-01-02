// src/components/AddCustomer.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddCustomer.css';

function AddCustomer() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare URL-encoded data
      const data = new URLSearchParams();
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      data.append('phoneNumber', formData.phoneNumber);
      data.append('email', formData.email);
      data.append('sessionId', 'your-cookie-value'); // Pass the cookie value in the body
      
      let headers1 = new Headers();
      headers1.set('Cookie', document.cookie);
      headers1.set('Content-Type', 'application/json');

      // Send POST request without custom headers
      const response = await fetch(
        'http://localhost:8080/v2/process-instances',
        {
          method: 'POST',
          headers: headers1,
          body: JSON.stringify({
            "processDefinitionId": "BPMN_DMN_DISH",
            "variables": {"var1" : "value 1",
            "var 2" : 8130}
          })
        }
      );
  
      if (response.ok) {
        alert('Request submitted successfully!');
        navigate('/');
      } else {
        const errorData = await response.json();
        alert('Failed to submit request: ' + errorData.message);
      }
    } catch (error) {
      alert('Error submitting request: ' + error.message);
    }
  };
  

  return (
    <div className="add-customer-container">
      <div className="header-image"></div>
      <h2 className="add-customer-title">Add a New Customer</h2>
      <form className="add-customer-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddCustomer;
