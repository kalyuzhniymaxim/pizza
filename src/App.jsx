import React, { useState } from 'react';
import { Routes, Route } from 'react-router';

import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFounds from './pages/NotFounds';

function App() {
  const [searchValue, setSearchValue] = useState('')
  console.log(searchValue)
  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={(e)=>setSearchValue(e)}/>
      <div className="content">

          <Routes>
            <Route path='/' element={<Home searchValue={searchValue}/>} />
            <Route path='cart' element={<Cart/>}/>
            <Route path='*' element={<NotFounds/>}/>
          </Routes>

      </div>
    </div>
  );
}

export default App;
