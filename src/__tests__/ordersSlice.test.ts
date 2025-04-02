import { ordersMock } from '@dataTests';
import { ordersSlice, initialStateOrders } from '@slices';
import { fetchOrders } from '@actions';

describe('тесты редьюсеров orders', () => {
  const initialState = initialStateOrders;
  test('Получение списка заказов пользователя pending', () => {
    const action = { type: fetchOrders.pending.type };
    const state = ordersSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: true });
  });
  test('Получение списка заказов пользователя rejected', () => {
    const errorMessage = 'load orders error...';
    const action = {
      type: fetchOrders.rejected.type,
      error: { message: errorMessage }
    };
    const state = ordersSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isError: true,
      errorMessage: errorMessage
    });
  });
  test('Получение списка заказов пользователя fullField', () => {
    const action = { type: fetchOrders.fulfilled.type, payload: ordersMock };
    const state = ordersSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, orders: ordersMock });
  });
});
