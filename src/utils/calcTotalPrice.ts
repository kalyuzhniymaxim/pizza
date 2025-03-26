import { CartItems } from '../redux/slices/cartSlice';

export const CalcTotalPrice = (items: CartItems[]) => {
  return items.reduce((acc, item) => acc + item.price * item.count, 0);
};
