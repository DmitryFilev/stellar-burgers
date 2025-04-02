import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
//import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchOrder, fetchGetOrder } from '@actions';
import { clearBurger } from '@slices';
import { useDispatch, useSelector } from '@store';
import { IOrderState } from '@utils-types';

/**
 *  начальное состояние заказа
 **/
const initialState: IOrderState = {
  orderData: null,
  orderRequest: false,
  isError: false,
  errorMessage: ''
};

/**
 * Slice Заказ
 **/
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModalData(state) {
      state.orderData = null;
    }
  },
  selectors: {
    OrderRequest: (state) => state.orderRequest,
    OrderModalData: (state) => state.orderData
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.orderRequest = true;
        (state.isError = false), (state.errorMessage = '');
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.isError = true;
        state.errorMessage = action.error.message as string;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        (state.isError = false), (state.errorMessage = '');
        state.orderData = action.payload;
      })
      .addCase(fetchGetOrder.pending, (state) => {
        state.orderRequest = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchGetOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.isError = true;
        state.errorMessage = action.error.message as string;
      })
      .addCase(fetchGetOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.isError = false;
        state.errorMessage = '';
        state.orderData = action.payload.orders[0];
      });
  }
});

export const { OrderRequest, OrderModalData } = orderSlice.selectors;
export const { clearOrderModalData } = orderSlice.actions;
export default orderSlice.reducer;
export { initialState as initialStateOrder };
