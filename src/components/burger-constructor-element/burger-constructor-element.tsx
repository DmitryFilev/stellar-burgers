import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '@store';
import {
  deleteBurgerIngredient,
  moveIngredientUp,
  moveIngredientDown
} from '@slices';
export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    /**
     *Обработчики клавиш навигации по заказу
     */
    const handleMoveDown = () => {
      dispatch(moveIngredientDown(ingredient.id));
    };
    const handleMoveUp = () => {
      dispatch(moveIngredientUp(ingredient.id));
    };
    const handleClose = () => {
      dispatch(deleteBurgerIngredient(ingredient.id));
    };
    /**
     *Формирование JSX
     */
    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
