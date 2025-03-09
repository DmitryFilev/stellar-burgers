import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import type { PayloadAction } from '@reduxjs/toolkit';
import { IConstructorIngredient } from '@utils-types';
import { isType, moveElement } from '@utils';

/**
 *  начальное состояние Конструктора Бургера
 **/
const initialState: IConstructorIngredient = {
  bun: null,
  ingredients: []
};

/**
 * Slice Конструктор Бургера
 **/
export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addBurgerIngredient: (state, action) => {
      if (isType(action.payload, 'bun')) state.bun = action.payload;
      else
        state.ingredients.push({ ...action.payload, id: action.payload._id });
    },
    deleteBurgerIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (el) => el.id !== action.payload
      );
    },
    moveIngredientUp: (state, action) => {
      state.ingredients = moveElement(
        state.ingredients,
        'id',
        action.payload,
        -1
      );
    },
    moveIngredientDown: (state, action) => {
      state.ingredients = moveElement(
        state.ingredients,
        'id',
        action.payload,
        1
      );
    },
    clearBurger: (state) => {
      [state.bun, state.ingredients] = [
        initialState.bun,
        initialState.ingredients
      ];
    }
  },
  selectors: {
    burgerIngredients: (state) => state.ingredients,
    burgerBun: (state) => state.bun,
    burgerState: (state) => state,
    burgerCountItems: (state) => state.ingredients.length + (!state.bun ? 0 : 2)
  }
});

export const { burgerState, burgerBun, burgerIngredients, burgerCountItems } =
  burgerSlice.selectors;
export const {
  addBurgerIngredient,
  deleteBurgerIngredient,
  clearBurger,
  moveIngredientUp,
  moveIngredientDown
} = burgerSlice.actions;
