import React, { useEffect, useState } from 'react';

import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activCategories, setActivCategories] = useState(0);
  const [activeSort, setActiveSort] = useState({
    name: 'популярности DESC',
    sortProperty: 'rating',
  });

  const category = activCategories > 0 ? `category=${activCategories}` : '';
  const order = activeSort.sortProperty.includes('-') ? 'asc' : 'desc';
  const sortBy = activeSort.sortProperty.replace('-', '');

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://67c59241351c081993fa8d3d.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activCategories, activeSort]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={activCategories} onClickActivCategories={(i) => setActivCategories(i)} />
        <Sort value={activeSort} onClickActiveSort={(i) => setActiveSort(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
}

export default Home;
