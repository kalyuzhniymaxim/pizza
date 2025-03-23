import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivCategories, setCurentPage, setFilter } from '../redux/slices/filterSlice';
import { setItems, featchPizzas } from '../redux/slices/pizzasSlice';
import Sort, { sorts } from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import NotFounds from './NotFounds';
import { RootState, useAppDispatch } from '../redux/store';

function Home() {
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { activCategories, activeSort, curentPage } = useSelector(
    (state: RootState) => state.filter,
  );
  const { items, isLoading } = useSelector((state: RootState) => state.pizzas);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onClickActivCategories = (i: number) => {
    dispatch(setActivCategories(i));
  };

  const onClickCurentPage = (i: number) => {
    dispatch(setCurentPage(i));
  };

  const { searchValue } = useContext(SearchContext);

  const getPizza = () => {
    const category = activCategories ? `&category=${activCategories}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const order = activeSort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = activeSort.sortProperty.replace('-', '');

    dispatch(
      featchPizzas({
        category,
        search,
        order,
        sortBy,
        curentPage: String(curentPage),
      }),
    );
  };

  const arraySkeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const filteredPizzas = items.map((pizza: any) => <PizzaBlock {...pizza} />);

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     const sort = sorts.find((list) => list.sortProperty == params.activeSort);

  //     dispatch(
  //       setFilter({
  //         ...params,
  //         activeSort,
  //       }),
  //     );
  //     isSearch.current = true;
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       activCategories,
  //       activeSort: activeSort.sortProperty,
  //       curentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [activCategories, activeSort, curentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizza();
    }
    isSearch.current = false;
  }, [activCategories, activeSort, searchValue, curentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={activCategories} onClickActivCategories={onClickActivCategories} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? arraySkeleton : items && items.length > 0 ? filteredPizzas : <NotFounds />}
      </div>
      <Pagination curentPage={curentPage} setCurentPage={onClickCurentPage} />
    </div>
  );
}

export default Home;
