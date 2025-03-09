import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '@utils';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi,
  TRegisterData,
  TLoginData,
  TUserResponse,
  TAuthResponse
} from '@api';
/**
 * Action регистрация пользователя
 **/
export const fetchRegisterUser = createAsyncThunk(
  'user/registr',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);
/**
 * Action получение информации о пользователе
 **/
export const fetchGetUser = createAsyncThunk('user/getData', async () => {
  const response = await getUserApi();
  return response;
});
/**
 * Action Login
 **/
export const fetchLoginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'user/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);
/**
 * Action Logout
 **/
export const fetchLogoutUser = createAsyncThunk('user/logout', async () => {
  const response = await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
  return response;
});
/**
 * Action обновление данных пользователя
 **/
export const fetchUpdateUser = createAsyncThunk<TUserResponse, TRegisterData>(
  'user/update',
  async (data) => {
    const response = await updateUserApi(data);
    return response;
  }
);
