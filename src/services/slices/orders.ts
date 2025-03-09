import { createSlice } from '@reduxjs/toolkit';
import { fetchOrders } from '@actions';
import { IProfileOrdersState } from '@utils-types';

/**
 *  начальное состояние списка заказов
 **/
const initialState: IProfileOrdersState = {
  orders: [],
  isLoading: false
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
        state.isLoading = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = true;
        state.orders = action.payload;
      });
  }
});
export const { ordersState, ordersIsLoading, orderByNumber } =
  ordersSlice.selectors;
