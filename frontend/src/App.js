import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home.jsx';
import Login from './routes/Login.jsx';
import Signup from './routes/Signup.jsx';
import GridList from './routes/GridList.jsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>
          <Route path='/grid_list' element={<GridList></GridList>}></Route>
        </Routes>
      </Router>      
    </div>
  );
}

export default App;
