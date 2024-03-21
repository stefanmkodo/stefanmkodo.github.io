import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Results from './pages/Results';
import Home from './pages/Home';
import Scan from './pages/Scan';
import {UseMobile} from "./pages/scanning/use-mobile";

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/results' element={<Results/>}></Route>
      <Route path='/scan' element={<Scan/>}></Route>
        <Route path='/scanning/use-mobile' element={<UseMobile />}></Route>
    </Routes>
  );
}

export default Main;