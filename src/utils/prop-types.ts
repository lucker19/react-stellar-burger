import { TOredersFEedActions } from "../services/actions/orders-feed";
import { store } from "./store";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../services/reducers";
import { TConstructorBurgerAction } from "../services/actions/burger-constructor";
import { TOrderActions } from "../services/actions/order";
import { TUserActions } from "../services/actions/user";
import { TIngredientDetailsActions } from "./../services/actions/ingredients-details";
import { TIngredientsActions } from "../services/actions/ingredients";
import { IConstWsActions, TWsActions } from "../services/actions/socket";
import { TWsProfileOrdersActions } from "../services/actions/profile-orders";

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins:number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  key: string;
  uniqueId?: string;
};

export type TSelectedIngredient = TIngredient & {
  id?: string;
}

export type TUser = {
  accessToken: string;
  refreshToken: string;
  user: {
      email: string;
      name: string;
      password?: string;
  };
};

export type TImages = {
  images: string;
  name: string;
};

export type TUserUpdate = {
  success: boolean;
  user: {
      email: string;
      name: string;
  };
};


export type TForm = {
  name?: string,
  password: string,
  email: string,
  token?: string
};

export interface IUser {
  name: string;
  email: string;
  password: string;
  token?: string
}
export interface IOrder {
  number: number;
}
export type TIngredientConstructor = TIngredient & { key: string };
export type TIngredients = Array<TIngredient>;

export type TIngredientsMap = {
  [name: string]: TIngredient;
};

export type TAppActions =
  | TConstructorBurgerAction
  | TOrderActions
  | TUserActions
  | TIngredientDetailsActions
  | TIngredientsActions
  | TWsActions
  | TOredersFEedActions
  | TWsProfileOrdersActions
export type TConstMiddlewareActions = IConstWsActions;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, Action, TAppActions>
>;
export type AppDispatch = typeof store.dispatch;

export type TOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  owner: string;
  status: string;
  updatedAt: string;
  _id: string;
  __v: number;

};

export type TOrders = {
  orders: TOrder[];
  success: boolean;
  total: number;
  totalToday: number;
};

export const getTime = (createdAt: string) => {
  if (new Date(createdAt).getTimezoneOffset() < 0) {
    return "i-GMT+" + new Date(createdAt).getTimezoneOffset() / -60;
  } else {
    return "i-GMT-" + new Date(createdAt).getTimezoneOffset() / -60;
  }
};

export const getStatus = (status: string) => {
  if (status === "done") {
    return "Выполнен";
  } else if (status === "created") {
    return "Создан";
  } else {
    return "Готовится";
  }
};
