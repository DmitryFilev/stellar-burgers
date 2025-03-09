import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getIngredientsApi } from '@api';
import { useDispatch, useSelector } from '@store';
import { fetchGetFeeds } from '@actions';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const response = dispatch(fetchGetFeeds());
  }, []);
  /**
   *Получение данных из store
   **/
  const orders: TOrder[] = useSelector((state) => state.feed.orders);
  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchGetFeeds());
      }}
    />
  );
};
