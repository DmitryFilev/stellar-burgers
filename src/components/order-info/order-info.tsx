import { FC, useMemo, useEffect } from 'react';
import { fetchGetOrder } from '@actions';
import { Preloader, OrderInfoUI } from '@ui';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '@store';
import { feedsOrders } from '@slices';
export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const numberOrder = Number(useParams().number);

  /**
   * Получение информации о заказах ленты с сервера
   **/
  useEffect(() => {
    dispatch(fetchGetOrder(numberOrder));
  }, [dispatch]);
  /**
   * Получение информации о заказе ленты из стора
   **/
  const orderData = useSelector(feedsOrders).filter(
    (el) => el.number === numberOrder
  )[0];
  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingredients.ingredients
  );
  /**
   *Подготовка данных для отображения
   **/
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;
    const date = new Date(orderData.createdAt);
    const status = orderData.status;
    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    const name = orderData.name;
    return {
      ...orderData,
      ingredientsInfo,
      date,
      total,
      status,
      name
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }
  /**
   * Формирование JSX
   */
  return <OrderInfoUI orderInfo={orderInfo} />;
};
