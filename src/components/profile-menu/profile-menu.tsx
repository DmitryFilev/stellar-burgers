import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '@store';
import { fetchLogoutUser } from '@actions';
import { useNavigate } from 'react-router-dom';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(fetchLogoutUser())
      .then(() => navigate('/login'))
      .catch((err) => alert(err));
  };
  /**
   *Формирование JSX
   */
  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
