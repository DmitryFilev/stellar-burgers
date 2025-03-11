import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IConstructorIngredient,
  TIngredient,
  TConstructorIngredient
} from '@utils-types';
import { isType, moveElement } from '@utils';
import { v4 as uuid4 } from 'uuid';

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
    /**
     * Исправление по первой итерации. Добавляется уникальное id.
     * Было: id принимал _id. Не учитывал, что можно добавить несколько одинаковых элементов, тогда DND ломается
     * Еще один опыт в копилку
     */
    addBurgerIngredient: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        if (isType(action.payload, 'bun')) state.bun = action.payload;
        else state.ingredients.push(action.payload);
      },
      prepare(ingredient: TIngredient) {
        return { payload: { ...ingredient, id: uuid4() } };
      }
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
