import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cards.css';

const Cards = () => {
  const navigate = useNavigate();

  const handleCompilerClick = () => {
    navigate('/compiler'); // Navigate to the compiler component
  };

  const handleUploadClick = () => {
    navigate('/upload'); // Navigate to the upload component or page
  };

  const handleContestClick = () => {
    navigate('/contest'); // Navigate to the contest component or page
  };

  return (
    <div className="cards-container">
      <div className="card" onClick={handleCompilerClick}>
        <h2>Use Compiler to Run Your Codes</h2>
        <p>Compile and run your code in various languages.</p>
      </div>
      <div className="card" onClick={handleUploadClick}>
        <h2>Upload a Problem</h2>
        <p>A user may upload their own coding problem along with its description, constraints, and test cases.</p>
      </div>
      <div className="card" onClick={handleContestClick}>
        <h2>Host a Contest</h2>
        <p>Plan and schedule a coding contest.</p>
      </div>
    </div>
  );
};

export default Cards;
