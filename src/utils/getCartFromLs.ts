import { CalcTotalPrice } from './calcTotalPrice';

export const getCartFromLs = () => {
  const data = localStorage.getItem('items');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = CalcTotalPrice(items);
  return {
    items,
    totalPrice,
  };
};
