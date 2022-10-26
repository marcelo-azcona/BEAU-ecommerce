import { CategoryItem } from '../categories/categories-types';

export type CartItem = CategoryItem & {
  quantity: number;
};
