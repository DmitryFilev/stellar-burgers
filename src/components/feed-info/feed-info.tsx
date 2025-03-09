import { FC, useEffect } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '@ui';
import { useSelector, useDispatch } from '@store';
import { fetchGetFeeds } from '@actions';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const dispatch = useDispatch();
  /**
   * Получение информации с сервера для ленты заказов
   **/
  const useGetFeeds = useEffect(() => {
    dispatch(fetchGetFeeds());
  }, [dispatch]);
  /**
   * Получение информации из store
   **/
  const orders: TOrder[] = useSelector((state) => state.feed.orders);
  const feed = useSelector((state) => state.feed);
  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');
  /**
   *Формирование JSX
   */
  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
