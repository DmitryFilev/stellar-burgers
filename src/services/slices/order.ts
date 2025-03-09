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
  orderRequest: false
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
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderData = action.payload;
      })
      .addCase(fetchGetOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchGetOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(fetchGetOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderData = action.payload.orders[0];
      });
  }
});

export const { OrderRequest, OrderModalData } = orderSlice.selectors;
export const { clearOrderModalData } = orderSlice.actions;
