import React, { useState } from 'react';
import { Routes, Route } from 'react-router';

import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFounds from './pages/NotFounds';


export const SearchContext = React.createContext();
function App() {
  const [searchValue, setSearchValue] = useState('');


  return (
    <div className="wrapper">
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<NotFounds />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
