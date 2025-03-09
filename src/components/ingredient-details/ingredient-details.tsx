import { FC } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useSelector } from '@store';
import { ingredientsState } from '@slices';
import { useParams } from 'react-router-dom';
export const IngredientDetails: FC = () => {
  const idIngredient = useParams().id;
  /**
   *Получение данных из store
   **/
  const ingredients = useSelector(ingredientsState);
  const ingredientData = ingredients.filter((el) => el._id === idIngredient)[0];
  if (!ingredientData) {
    return <Preloader />;
  }
  /**
   *Формирование JSX
   */
  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
