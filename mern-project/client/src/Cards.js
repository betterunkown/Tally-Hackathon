import React from 'react';
import './Cards.css';

const Cards = () => {
  return (
    <div className="cards-container">
      <div className="card">
        <h2>Use Compiler to Run Your Codes</h2>
        <p>Compile and run your code in various languages.</p>
      </div>
      <div className="card">
        <h2>Upload a Problem</h2>
        <p>A user may upload their own coding problem along with its description, constraints, and test cases.</p>
      </div>
      <div className="card">
        <h2>Host a Contest</h2>
        <p>Plan and schedule a coding contest.</p>
      </div>
    </div>
  );
};

export default Cards;
