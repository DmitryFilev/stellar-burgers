import { createSlice } from '@reduxjs/toolkit';
import { IIngredientListState } from '@utils-types';
import { fetchIngredients } from '@actions';

/**
 *  начальное состояние списка ингредиентов
 **/
const initialState: IIngredientListState = {
  ingredients: [],
  isLoading: false
};

/**
 * Slice Ингредиенты
 **/
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    ingredientsState: (state) => state.ingredients,
    ingredientsIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { ingredientsState, ingredientsIsLoading } =
  ingredientsSlice.selectors;
