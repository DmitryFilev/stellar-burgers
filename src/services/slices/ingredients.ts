import { createSlice } from '@reduxjs/toolkit';
import { IIngredientListState } from '@utils-types';
import { fetchIngredients } from '@actions';

/**
 *  начальное состояние списка ингредиентов
 **/
const initialState: IIngredientListState = {
  ingredients: [],
  isLoading: false,
  isError: false,
  errorMessage: ''
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
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message as string;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
        state.isError = false;
        state.errorMessage = '';
      });
  }
});

export const { ingredientsState, ingredientsIsLoading } =
  ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
export { initialState as initialStateIngredients };
