import { feedsMock } from '@dataTests';
import { feedsSlice, initialStateFeeds } from '@slices';
import { fetchGetFeeds } from '@actions';
describe('тесты редьюсеров orders', () => {
  const initialState = initialStateFeeds;
  test('Получение списка заказов pending', () => {
    const action = { type: fetchGetFeeds.pending.type };
    const state = feedsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: true });
  });
  test('Получение списка заказов rejected', () => {
    const errorMessage = 'load orders error...';
    const action = {
      type: fetchGetFeeds.rejected.type,
      error: { message: errorMessage }
    };
    const state = feedsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isError: true,
      errorMessage: errorMessage
    });
  });
  test('Получение списка заказов fullField', () => {
    const action = { type: fetchGetFeeds.fulfilled.type, payload: feedsMock };
    const state = feedsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: feedsMock.orders,
      total: feedsMock.total,
      totalToday: feedsMock.totalToday
    });
  });
});
