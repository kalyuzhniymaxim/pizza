import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivCategories, setCurentPage, setFilter } from '../redux/slices/filterSlice';
import axios from 'axios';
import qs from 'qs';
import Sort, { sorts } from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useNavigate } from 'react-router-dom';

function Home() {
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { activCategories, activeSort, curentPage } = useSelector((state) => state.filter);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickActivCategories = (i) => {
    dispatch(setActivCategories(i));
  };

  const onClickCurentPage = (i) => {
    dispatch(setCurentPage(i));
  };

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const featchPizza = () => {
    setIsLoading(true);
    const category = activCategories ? `&category=${activCategories}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const order = activeSort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = activeSort.sortProperty.replace('-', '');
    axios
      .get(
        `https://67c59241351c081993fa8d3d.mockapi.io/items?page=${curentPage}&limit=4${search}${category}&sortBy=${sortBy}&order=${order}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };

  const arraySkeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const filteredPizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sorts.find((list) => list.sortProperty == params.activeSort);

      dispatch(
        setFilter({
          ...params,
          activeSort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        activCategories,
        activeSort: activeSort.sortProperty,
        curentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activCategories, activeSort, curentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      featchPizza();
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
      <div className="content__items">{isLoading ? arraySkeleton : filteredPizzas}</div>
      <Pagination curentPage={curentPage} setCurentPage={onClickCurentPage} />
    </div>
  );
}

export default Home;
