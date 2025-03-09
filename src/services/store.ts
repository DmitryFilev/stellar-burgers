import { configureStore, combineSlices } from '@reduxjs/toolkit';
import {
  ingredientsSlice,
  orderSlice,
  burgerSlice,
  ordersSlice,
  feedsSlice,
  userSlice
} from '@slices';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
export const rootReducer = combineSlices(
  ingredientsSlice,
  burgerSlice,
  orderSlice,
  ordersSlice,
  feedsSlice,
  userSlice
);
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export default store;
