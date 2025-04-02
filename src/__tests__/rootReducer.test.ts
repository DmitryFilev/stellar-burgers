import { rootReducer } from '@store';
import {
  initialStateFeeds,
  initialStateOrder,
  initialStateOrders,
  initialStateIngredients,
  initialStateBurger,
  initialStateUser
} from '@slices';

test('Проверка инициализации rootReducer', () => {
  const state = rootReducer(undefined, { type: '' });
  expect(state.burger).toEqual(initialStateBurger);
  expect(state.feed).toEqual(initialStateFeeds);
  expect(state.ingredients).toEqual(initialStateIngredients);
  expect(state.order).toEqual(initialStateOrder);
  expect(state.orders).toEqual(initialStateOrders);
  expect(state.user).toEqual(initialStateUser);
});
