import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader } from '@components';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import {
  OrderInfo,
  IngredientDetails,
  Modal,
  ProtectedRoute
} from '@components';
import { useDispatch } from '@store';
import { clearOrderModalData } from '@slices';
const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /**
   *Обработчик закрытия модального окна
   */
  const onClose = () => {
    navigate(-1);
    dispatch(clearOrderModalData());
  };
  /**
   *Формирование JSX
   **/
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders/:number'
            element={
              <Modal title='Ордер' onClose={onClose}>
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              </Modal>
            }
          />
        </Route>
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/feed/:number'
          element={
            <Modal title='Ордер' onClose={onClose}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={onClose}>
              <IngredientDetails />
            </Modal>
          }
        />
      </Routes>
    </div>
  );
};
export default App;
