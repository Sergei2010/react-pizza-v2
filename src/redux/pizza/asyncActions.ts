import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Pizza, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { category, sortBy, order, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(`https://629219decd0c91932b6d45bd.mockapi.io/items?
			  page=${currentPage}&limit=4
			  &${category}&sortBy=${sortBy}&order=${order}${search}`);
    return data;
  },
);
