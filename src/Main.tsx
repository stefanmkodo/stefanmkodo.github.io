import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Results from './pages/Results';
import Home from './pages/Home';
import Scan from './pages/Scan';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/results' element={<Results/>}></Route>
      <Route path='/scan' element={<Scan/>}></Route>
    </Routes>
  );
}

export default Main;