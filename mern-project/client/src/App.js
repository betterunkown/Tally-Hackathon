import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ProblemTable from './ProblemTable';
import Cards from './Cards';
import Compiler from './Compiler';
import Upload from './Upload'; // Add your upload component
import Contest from './Contest'; // Add your contest component

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
          <div className="content-container">
            <Routes>
              <Route path="/" element={<ProblemTable />} />
              <Route path="/compiler" element={<Compiler />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/contest" element={<Contest />} />
              {/* Define other routes here as needed */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
