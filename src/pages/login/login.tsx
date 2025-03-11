import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { fetchLoginUser } from '@actions';
import { useDispatch, useSelector } from '@store';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { translateLoginError } from '@utils';

export const Login: FC = () => {
  const dispatch = useDispatch();

  /**
   *Получение данных из store
   **/
  const error = translateLoginError(
    useSelector((state) => state.user.errorMessage)
  );

  const user = useSelector((state) => state.user);
  const storageEmail = localStorage.getItem('emailUser') ?? '';
  const [email, setEmail] = useState(storageEmail);
  const [password, setPassword] = useState('');
  const location = useLocation();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem('emailUser', email);
    const loginData = { email, password };
    dispatch(fetchLoginUser(loginData)).then(() => {
      setPassword('');
      if (!user.isAuth) {
        const { from } = location.state || { from: { pathname: '/' } };
        return <Navigate to={from} />;
      }
    });
  };

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
