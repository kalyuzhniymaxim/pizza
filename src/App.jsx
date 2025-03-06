import React, { useState } from 'react';
import { Routes, Route } from 'react-router';

import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFounds from './pages/NotFounds';
// import { increment, decrement } from './redux/slices/counterSlice';
// import { useDispatch, useSelector } from 'react-redux';

export const SearchContext = React.createContext();
function App() {
  const [searchValue, setSearchValue] = useState('');
  // const dispatch = useDispatch();
  // const count = useSelector((state) => state.counter.counter);
  // console.log(count);

  return (
    <div className="wrapper">
      {/* <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <span>{count}</span>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div> */}
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
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
