import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '@store';
import { fetchOrders } from '@actions';
export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  /**
   *Получение данных из store
   **/
  const orders: TOrder[] = useSelector((state) => state.orders.orders);
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  return <ProfileOrdersUI orders={orders} />;
};
