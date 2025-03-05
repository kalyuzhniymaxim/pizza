import React, { useState } from 'react';

function Categories({value, onClickActivCategories}) {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];
  const [activCategories, setActivCategories] = useState(0);

  return (
    <div className="categories">
      <ul>
        {categories.map((categorie, i) => (
          <li key={i}
            onClick={() => onClickActivCategories(i)}
            className={value === i ? 'active' : ''}>
            {categorie}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
