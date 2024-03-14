import React, { useState } from 'react';
import MyContext from './MyContext';

const MyContextProvider = ({ children }) => {

  const [config, setConfig] = useState({
    isAlgorithmRunning: false,
    algorithm: null,
  });

  function startAlgorithm(isRunning, algorithmName) {
    setConfig(prevConfig => ({
      ...prevConfig,
      isAlgorithmRunning: isRunning,
      algorithm: algorithmName,
    }));
  };

  return (
    <MyContext.Provider value={{ config, startAlgorithm }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
