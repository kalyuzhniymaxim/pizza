import React from 'react';
import { Routes, Route } from 'react-router';

import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFounds from './pages/NotFounds';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">

          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='cart' element={<Cart/>}/>
            <Route path='*' element={<NotFounds/>}/>
          </Routes>

      </div>
    </div>
  );
}

export default App;
