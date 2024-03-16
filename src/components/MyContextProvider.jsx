import React, { useState } from 'react';
import MyContext from './MyContext';

const MyContextProvider = ({ children }) => {

  const [config, setConfig] = useState({
    isAlgorithmRunning: false,
    algorithm: "",
    speed: "20",
  });

  function startAlgorithm(isRunning, algorithmName, speed) {
    setConfig(prevConfig => ({
      ...prevConfig,
      isAlgorithmRunning: isRunning,
      algorithm: algorithmName,
      speed: speed,
    }));
  };

  return (
    <MyContext.Provider value={{ config, startAlgorithm }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
