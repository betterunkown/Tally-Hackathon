import React from 'react';
import { useParams } from 'react-router-dom';

const Compiler = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Compiler Mode for Problem ID: {id}</h1>
      {/* Add your code editor or compiler UI here */}
    </div>
  );
};

export default Compiler;
