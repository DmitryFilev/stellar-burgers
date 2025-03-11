import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';

export const AppHeader: FC = () => {
  /**
   *Получение имени пользователя из store(если пользователь есть)
   */
  const userName = useSelector((state) => state.user.userData?.name);
  /**
   *Формирование JSX
   */
  return <AppHeaderUI userName={userName} />;
};
