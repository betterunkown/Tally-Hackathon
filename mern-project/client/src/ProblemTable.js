import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProblemTable.css';

const ProblemTable = () => {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch problems from the backend
    const fetchProblems = async () => {
      try {
        const response = await fetch('http://localhost:5000/problems');
        const data = await response.json();
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
  }, []);

  const handleTitleClick = (id) => {
    navigate(`/compiler/${id}`);
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Topic</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, index) => (
            <tr key={problem._id} className="table-row">
              <td>{index + 1}</td> {/* Serial Number */}
              <td
                className="clickable-title"
                onClick={() => handleTitleClick(problem._id)}
              >
                {problem.title}
              </td>
              <td>
                <button
                  className={`difficulty-button ${problem.difficulty.toLowerCase()}`}
                >
                  {problem.difficulty}
                </button>
              </td>
              <td>{problem.topic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemTable;
