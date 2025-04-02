import { createSlice } from '@reduxjs/toolkit';
import { fetchOrders } from '@actions';
import { IProfileOrdersState } from '@utils-types';

/**
 *  начальное состояние списка заказов
 **/
const initialState: IProfileOrdersState = {
  orders: [],
  isLoading: false,
  isError: false,
  errorMessage: ''
};

/**
 * Slice История заказов
 **/
export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    ordersState: (state) => state.orders,
    ordersIsLoading: (state) => state.isLoading,
    orderByNumber: (state, numberOrder) =>
      state.orders.filter((el) => el.number === numberOrder)[0]
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message as string;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = '';
        state.orders = action.payload;
      });
  }
});
export const { ordersState, ordersIsLoading, orderByNumber } =
  ordersSlice.selectors;
export default ordersSlice.reducer;
export { initialState as initialStateOrders };
