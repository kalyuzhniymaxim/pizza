import React, { useState } from 'react';

function Categories() {
  const [categories, SetCategories] = useState([
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]);
  const [activCategories, setActivCategories] = useState(0);
  const chooseCategory = (i) => {
    setActivCategories(i);
  };
  return (
    <div className="categories">
      <ul>
        {categories.map((categorie, i) => (
          <li key={i}
            onClick={() => chooseCategory(i)}
            className={activCategories === i ? 'active' : ''}>
            {categorie}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
