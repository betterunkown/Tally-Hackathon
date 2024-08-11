import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ProblemTable from './ProblemTable';
import Cards from './Cards';
import Compiler from './Compiler';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="intro-section">
          <h1>Welcome to the Coding Problem Hub!</h1>
          <p>Browse through problems, run your code, or upload your own challenges.</p>
        </div>
        <div className="table-cards-container">
          <div className="cards-container">
            <Cards />
          </div>
          <div className="table-container">
            <Routes>
              <Route path="/" element={<ProblemTable />} />
              <Route path="/compiler/:id" element={<Compiler />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
