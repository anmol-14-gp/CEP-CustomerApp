import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddCustomer from './components/AddCustomer';
import CalculatePremium from './components/CalculatePremium';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/calculate-premium" element={<CalculatePremium />} />
      </Routes>
    </Router>
  );
}

export default App;
