import React, { useState } from 'react';
import MyContext from './MyContext';

const MyContextProvider = ({ children }) => {

  const [config, setConfig] = useState({
    runAlgorithm: false,
    algorithm: "",
    speed: "20",
    maze: "",
    clear: false,
  });

  function startAlgorithm(runAlgorithm, algorithmName, speed, maze, clear) {
    setConfig(prevConfig => ({
      ...prevConfig,
      runAlgorithm: runAlgorithm,
      algorithm: algorithmName,
      speed: speed,
      maze: maze,
      clear: clear,
    }));
  };

  return (
    <MyContext.Provider value={{ config, startAlgorithm }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
