import reducer, { clearOrderModalData } from '../services/slices/order';
import { orderDataMock, orderResponseMock } from '@dataTests';
import * as types from '@utils-types';
import { orderSlice, initialStateOrder } from '@slices';
import { fetchOrder, fetchGetOrder } from '@actions';
describe('тесты редьюсеров order', () => {
  const initialState = initialStateOrder;
  const testState: types.IOrderState = {
    orderData: orderDataMock,
    orderRequest: false,
    isError: false,
    errorMessage: ''
  };
  test('очистка модального окна', () => {
    // очистка модального окна заказа
    const newState = reducer(testState, clearOrderModalData());
    // сравниваем то что получилось с ожидаемым результатом
    expect(newState.orderData).toEqual(null);
  });
  test('Заказ бургера pending', () => {
    const action = { type: fetchOrder.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, orderRequest: true });
  });
  test('Заказ rejected', () => {
    const errorMessage = 'Order error...';
    const action = {
      type: fetchOrder.rejected.type,
      error: { message: errorMessage }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isError: true,
      errorMessage: errorMessage
    });
  });
  test('Заказ fullField', () => {
    const action = {
      type: fetchOrder.fulfilled.type,
      payload: orderResponseMock
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, orderData: orderResponseMock });
  });
  test('Получение информации о заказе pending', () => {
    const action = { type: fetchGetOrder.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, orderRequest: true });
  });
  test('Получение информации о заказе rejected', () => {
    const errorMessage = 'load orders error...';
    const action = {
      type: fetchGetOrder.rejected.type,
      error: { message: errorMessage }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isError: true,
      errorMessage: errorMessage
    });
  });
  test('Получение информации о заказе fullField', () => {
    const action = {
      type: fetchGetOrder.fulfilled.type,
      payload: { success: true, orders: [orderDataMock] }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, orderData: orderDataMock });
  });
});
