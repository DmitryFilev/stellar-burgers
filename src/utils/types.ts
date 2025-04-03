export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

export type TConstructorIngredient = TIngredient & {
  id: string;
};
export type TOrder = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
  price?: number;
  owner?: TUserOrder;
};

export type TOrdersData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export interface IIngredientListState {
  ingredients: TIngredient[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}
export interface IFeedListState extends TOrdersData {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}
export interface IConstructorIngredient {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}
export interface IOrderState {
  orderData: TOrder | null;
  orderRequest: boolean;
  isError: boolean;
  errorMessage: string;
}
export interface IProfileOrdersState {
  orders: TOrder[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}
export type TUser = {
  email: string;
  name: string;
};
export interface IUserState {
  userData: TUser | null;
  isAuth: boolean;
  isCheck: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}
export type TTabMode = 'bun' | 'sauce' | 'main';
export type orderResponse = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: TIngredient[];
  price: number;
  owner: TUserOrder;
};
export type TUserOrder = {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};
