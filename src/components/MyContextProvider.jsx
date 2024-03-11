import React, { useState } from 'react';
import MyContext from './MyContext';

const MyContextProvider = ({ children }) => {

  const [isAlgorithmRunning, setIsAlgorithmRunning] = useState(false);

  function startAlgorithm() {
    setIsAlgorithmRunning(true);
  };

  return (
    <MyContext.Provider value={{ isAlgorithmRunning, startAlgorithm }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
