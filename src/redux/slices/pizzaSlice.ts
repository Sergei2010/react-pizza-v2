import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CartItem } from './cartSlice';
import { RootState } from '../store';

export const fetchPizzas = createAsyncThunk<CartItem[], Record<string, string>>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { category, sortBy, order, search, currentPage } = params;
    const { data } = await axios.get(`https://629219decd0c91932b6d45bd.mockapi.io/items?
			page=${currentPage}&limit=4
			&${category}&sortBy=${sortBy}&order=${order}${search}`);
    return data;
  },
);

type Pizza = {
  id: string;
  title: string;
  imageUrl: string;
  types: number[];
  sizes: number[];
  price: number;
};
interface PizzaSliceState {
  items: Pizza[];
  status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
  items: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      //console.log(fetchPizzas.pending.toString());
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      //console.log(fetchPizzas.fulfilled.toString());
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      //console.log(fetchPizzas.rejected.toString());
      state.status = 'error';
      state.items = [];
    },
  },
});

//  использую SELECTOR
export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
