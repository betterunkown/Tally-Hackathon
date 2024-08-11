import React, { useState } from 'react';
import './Compiler.css'; // Assuming the styles are saved in this file
import { Editor } from '@monaco-editor/react';

const Compiler = () => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [memoryUsage, setMemoryUsage] = useState('');
  const [executionTime, setExecutionTime] = useState('');
  const [error, setError] = useState('');

  const handleCompile = async () => {
    setOutput('');
    setError('');
    const startTime = performance.now();
    try {
      const response = await fetch('http://localhost:5000/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code, input }),
      });
      const data = await response.json();
      const endTime = performance.now();
      if (response.ok) {
        setOutput(data.output);
        setMemoryUsage(data.memoryUsage);
        setExecutionTime(`${((endTime - startTime) / 1000).toFixed(2)} seconds`);
      } else {
        setError(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred.');
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
        <Editor
          height="400px"
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{ selectOnLineNumbers: true }}
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
        {error && <p className="error-message">{error}</p>}
        <pre>{output}</pre>
        <p>Memory Usage: {memoryUsage}</p>
        <p>Execution Time: {executionTime}</p>
      </div>
    </div>
  );
};

export default Compiler;
