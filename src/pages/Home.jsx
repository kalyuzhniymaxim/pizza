import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivCategories, setActiveSort } from '../redux/slices/filterSlice';

import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

function Home() {
  const {activCategories, activeSort} = useSelector((state) => state.filter);

  const dispatch = useDispatch();
  const onClickActivCategories = (i) => {
    dispatch(setActivCategories(i));
  };
  
  const onClickActiveSort = (i) => {
    dispatch(setActiveSort(i));
  };

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [curentPage, setCurentPage] = useState(1);

  const arraySkeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const filteredPizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  const category = activCategories ? `&category=${activCategories}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';
  const order = activeSort.sortProperty.includes('-') ? 'asc' : 'desc';
  const sortBy = activeSort.sortProperty.replace('-', '');

  useEffect(() => {
    setIsLoading(true);
    const url = `https://67c59241351c081993fa8d3d.mockapi.io/items?page=${curentPage}&limit=4${search}${category}&sortBy=${sortBy}&order=${order}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных:', error);
        setItems([]);
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
      <Pagination curentPage={curentPage} setCurentPage={(page) => setCurentPage(page)} />
    </div>
  );
}

export default Home;
