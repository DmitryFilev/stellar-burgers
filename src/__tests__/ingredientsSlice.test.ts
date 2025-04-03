import { fetchIngredients } from '@actions';
import { mockIngredients } from '@dataTests';
import { ingredientsSlice, initialStateIngredients } from '@slices';
const initialState = initialStateIngredients;
describe('тест сущностей слайса ingredients', () => {
  test('Получение ингредиентов fullField', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, ingredients: mockIngredients });
  });
  test('Получение ингредиентов pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: true });
  });
  test('Получение ингредиентов rejected', () => {
    const errorMessage = 'loading error...';
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: errorMessage }
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isError: true,
      errorMessage: errorMessage
    });
  });
});
