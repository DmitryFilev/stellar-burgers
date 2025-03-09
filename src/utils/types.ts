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
};

export type TOrdersData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export interface IIngredientListState {
  ingredients: TIngredient[];
  isLoading: boolean;
}
export interface IFeedListState extends TOrdersData {
  isLoading: boolean;
}
export interface IConstructorIngredient {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}
export interface IOrderState {
  orderData: TOrder | null;
  orderRequest: boolean;
}
export interface IProfileOrdersState {
  orders: TOrder[];
  isLoading: boolean;
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
