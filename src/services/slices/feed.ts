import { createSlice } from '@reduxjs/toolkit';
import { IFeedListState } from '@utils-types';
import { fetchGetFeeds } from '@actions';

/**
 *  начальное состояние ленты заказов
 **/
const initialState: IFeedListState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false
};
/**
 * Slice Ингредиенты
 **/
export const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    feedsOrders: (state) => state.orders,
    feedsTotal: (state) => state.total,
    feedsTotalToday: (state) => state.totalToday,
    feedsIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetFeeds.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchGetFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const { feedsOrders, feedsTotal, feedsTotalToday, feedsIsLoading } =
  feedsSlice.selectors;
