import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivCategories, setCurentPage } from '../redux/slices/filterSlice';
import axios from 'axios';

import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

function Home() {
  const { activCategories, activeSort, curentPage } = useSelector((state) => state.filter);

  const dispatch = useDispatch();
  const onClickActivCategories = (i) => {
    dispatch(setActivCategories(i));
  };

  const onClickCurentPage = (i) => {
   dispatch(setCurentPage(i))
  }

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [curentPage, setCurentPage] = useState(1);

  const arraySkeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const filteredPizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  const category = activCategories ? `&category=${activCategories}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';
  const order = activeSort.sortProperty.includes('-') ? 'asc' : 'desc';
  const sortBy = activeSort.sortProperty.replace('-', '');

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `https://67c59241351c081993fa8d3d.mockapi.io/items?page=${curentPage}&limit=4${search}${category}&sortBy=${sortBy}&order=${order}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activCategories, activeSort, searchValue, curentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={activCategories} onClickActivCategories={onClickActivCategories} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? arraySkeleton : filteredPizzas}</div>
      <Pagination curentPage={curentPage} setCurentPage={onClickCurentPage} />
    </div>
  );
}

export default Home;
