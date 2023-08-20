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
  price: number;
  type: string;
  calories: number;
  carbohydrates: number;
  fat: number;
  proteins: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
  uuid?: string;
  index?: number;
  key?: any;
  id?: string
};

export type TSelectedIngredient = TIngredient & {
  id?: string;
}


export interface IUser {
  name: string;
  email: string;
  password: string;
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
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
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
