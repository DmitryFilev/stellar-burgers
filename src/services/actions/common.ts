import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getIngredientsApi,
  getOrdersApi,
  getOrderByNumberApi,
  orderBurgerApi
} from '@api';

/**
 * Action получение ленты заказов
 **/
export const fetchGetFeeds = createAsyncThunk('feed/getFeeds', async () => {
  const response = await getFeedsApi();
  return response;
});

/**
 * Action получение ингредиентов
 **/
export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);
/**
 * Action получение списка заказов
 **/
export const fetchOrders = createAsyncThunk('orders', async () => {
  const response = await getOrdersApi();
  return response;
});
/**
 * Action Заказ
 **/
export const fetchOrder = createAsyncThunk(
  'order/putOrder',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    if (!response.success) throw new Error('С заказом что то не так');
    return response.order;
  }
);
/**
 * Action Получение данных заказа по номеру
 **/
export const fetchGetOrder = createAsyncThunk(
  'order/getOrder',
  async (numberOrder: number) => {
    const response = await getOrderByNumberApi(numberOrder);
    return response;
  }
);
