import {
  moveIngredientUp,
  moveIngredientDown,
  deleteBurgerIngredient,
  addBurgerIngredient
} from '@slices';
import reducer, {
  clearBurger,
  initialState
} from '../services/slices/constructor';
import {
  mockConstructor,
  mockConstructorAfterMove,
  mockConstructorAfterDelete,
  mockConstructorAfterAddBun,
  additionalBun,
  additionalIngredient
} from '@dataTests';
import * as utils from '@utils';

describe('тесты редьюсеров конструктора', () => {
  test('продвижение ингредиента вверх', () => {
    // продвижение ингредиента c id ='2' вверх
    const newState = reducer(mockConstructor, moveIngredientUp('2'));
    // сравниваем то что получилось с ожидаемым результатом
    expect(newState).toEqual(mockConstructorAfterMove);
  });
  test('продвижение ингредиента вниз', () => {
    // продвижение ингредиента c id ='2' вниз(возвращаем в исходное состояние)
    const newState = reducer(mockConstructorAfterMove, moveIngredientDown('2'));
    // сравниваем то что получилось с ожидаемым результатом
    expect(newState).toEqual(mockConstructor);
  });
  test('удаление ингредиента', () => {
    // удаление ингредиента с id = '3'
    const newState = reducer(mockConstructor, deleteBurgerIngredient('3'));
    // сравниваем то что получилось с ожидаемым результатом
    expect(newState).toEqual(mockConstructorAfterDelete);
  });
  test('добавление булки', () => {
    // добавление булки
    const newState = reducer(
      mockConstructor,
      addBurgerIngredient(additionalBun)
    );
    // сравниваем то что получилось с ожидаемым результатом
    expect(newState).toEqual(mockConstructorAfterAddBun);
  });
  test('добавление ингредиента', () => {
    // добавление ингредиента с id='3'
    //мокирование получение id
    jest.mock('@utils');
    const mySpy = jest.spyOn(utils, 'getId');
    mySpy.mockReturnValue('3');
    const newState = reducer(
      mockConstructorAfterDelete,
      addBurgerIngredient(additionalIngredient)
    );
    // сравниваем то что получилось с ожидаемым результатом

    expect(newState).toEqual(mockConstructor);
  });
  test('очистка конструктора', () => {
    // очистка конструктора
    const newState = reducer(mockConstructor, clearBurger());
    // сравниваем то что получилось с ожидаемым результатом
    expect(newState).toEqual(initialState);
  });
});
