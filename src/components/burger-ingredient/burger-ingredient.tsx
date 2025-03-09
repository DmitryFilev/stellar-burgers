import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '@store';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { addBurgerIngredient } from '@slices';
import { burgerCountItems } from '@slices';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    /**
     *Обработчик добавления ингредиента
     */
    const handleAdd = () => {
      dispatch(addBurgerIngredient({ ...ingredient }));
    };
    /**
     *Формирование JSX
     */
    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
