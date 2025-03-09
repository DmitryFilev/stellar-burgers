import { userData, userIsAuth } from '@slices';
import { useSelector } from '@store';
import { Navigate } from 'react-router';
import { Preloader } from '@ui';
import { useLocation } from 'react-router';
type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};
/**
 * Component защищённый маршрут
 **/
export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuth = useSelector(userIsAuth);
  const user = useSelector(userData);
  const location = useLocation();
  if (!onlyUnAuth && !user) {
    // редирект на страницу login, если нет пользователя
    return <Navigate replace to='/login' state={{ from: location }} />;
  }
  if (!onlyUnAuth && !isAuth) {
    // показ прелоадера, пока не загружен пользователь
    return <Preloader />;
  }
  if (onlyUnAuth && user) {
    // если пользователь на странице авторизации и данные есть в хранилище
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
