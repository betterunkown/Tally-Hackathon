import React, { useState } from 'react';
import './Compiler.css'; // Assuming the styles are saved in this file

const Compiler = () => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [memoryUsage, setMemoryUsage] = useState('');

  const handleCompile = async () => {
    try {
      const response = await fetch('http://localhost:5000/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code, input }),
      });
      const data = await response.json();
      if (response.ok) {
        setOutput(data.output);
        setMemoryUsage(data.memoryUsage);
      } else {
        setOutput(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="compiler-container">
      <div className="header">
        <h1>Code Compiler</h1>
        <div className="run-form">
          <div className="language-select">
            <span>Language:</span>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
              {/* Add more languages if needed */}
            </select>
          </div>
          <button className="run-button" onClick={handleCompile}>Run Code</button>
        </div>
      </div>
      <div className="code-editor">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your code here..."
        />
      </div>
      <div className="input-section">
        <h2>Input (optional)</h2>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter input for your code here..."
        />
      </div>
      <div className="output-section">
        <h2>Output</h2>
        <pre>{output}</pre>
        <p>Memory Usage: {memoryUsage}</p>
      </div>
    </div>
  );
};

export default Compiler;
