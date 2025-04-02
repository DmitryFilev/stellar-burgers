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
  isLoading: false,
  isError: false,
  errorMessage: ''
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
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchGetFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message as string;
      })
      .addCase(fetchGetFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = '';
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const { feedsOrders, feedsTotal, feedsTotalToday, feedsIsLoading } =
  feedsSlice.selectors;
export default feedsSlice.reducer;
export { initialState as initialStateFeeds };
