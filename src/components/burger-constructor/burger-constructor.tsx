import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  burgerState,
  clearOrderModalData,
  OrderModalData,
  OrderRequest,
  userIsAuth,
  clearBurger
} from '@slices';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '@store';
import { fetchOrder } from '@actions';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /**
   *Получение данных из store
   */
  const constructorItems = useSelector(burgerState);
  const isAuth = useSelector(userIsAuth);
  const orderRequest = useSelector(OrderRequest);
  const orderModalData = useSelector(OrderModalData);
  /**
   *Обработчик клика по кнопке оформить
   */
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return; //если пустой конструктор игнор нажатия
    if (!isAuth)
      navigate('/login'); //если клиент не прошел авторизацию, отправка его на форму входа
    else {
      const ingredientsListId = [constructorItems.bun._id].concat(
        constructorItems.ingredients.map((el) => el._id),
        [constructorItems.bun._id]
      );
      dispatch(fetchOrder(ingredientsListId));
    }
  };
  /**
   *обработчик закрытия модального окна
   */
  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
    dispatch(clearBurger());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );
  /**
   *Формирование JSX
   */
  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
