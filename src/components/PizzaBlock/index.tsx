import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItems } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';
const typeNames = ['тонкое', 'традиционное'];
type PizzaBlockType = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  types: number[];
  count: number;
};

const PizzaBlock: React.FC<PizzaBlockType> = ({ id, title, imageUrl, price, sizes, types }) => {
  const [activSize, setActivSize] = useState(0);
  const [activTypes, setActivTypes] = useState(0);

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === id),
  );

  const addCount = cartItem ? cartItem.count : 0;
  const dispatch = useDispatch();

  const onClickAddItems = () => {
    const item = {
      id,
      title,
      imageUrl,
      price,
      sizes: sizes[activSize],
      types: typeNames[activTypes],
      count: 0,
    };
    dispatch(addItems(item));
  };

  return (
    <div className="pizza-block">
      <Link key={id} to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>

      <div className="pizza-block__selector">
        <ul>
          {types.map((type, i) => (
            <li
              key={i}
              onClick={() => setActivTypes(i)}
              className={activTypes === i ? 'active' : ''}>
              {typeNames[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li key={i} onClick={() => setActivSize(i)} className={activSize === i ? 'active' : ''}>
              {size}
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button onClick={onClickAddItems} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addCount > 0 && <i>{addCount}</i>}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
