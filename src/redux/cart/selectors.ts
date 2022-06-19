//  использую SELECTOR
//  тут обращение к глобальному state

import { RootState } from '../store';

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);
