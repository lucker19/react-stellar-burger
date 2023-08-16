import { store } from "..";
import {Action, ActionCreator} from "redux";
import {ThunkAction} from "redux-thunk";
import { RootState } from "../services/reducers";
import { TConstructorBurgerAction } from "../services/actions/burger-constructor";
import { TOrderActions } from "../services/actions/order";
import { TUserActions } from "../services/actions/user";
import { TIngredientDetailsActions } from './../services/actions/ingredients-details';
import { TIngredientsActions } from '../services/actions/ingredients';



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
}
export type TIngredientConstructor = TIngredient & {
	id: string;
};

export interface IUser {
  name: string;
  email: string;
  password: string;
}
export interface IOrder {
  number: number;
}

export type TIngredients = Array<TIngredient>;

export type TIngredientsMap = {
  [name: string]: TIngredient;
}

export type TAppActions = TConstructorBurgerAction | TOrderActions | TUserActions | TIngredientDetailsActions | TIngredientsActions

export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, RootState, Action, TAppActions>>
export type AppDispatch = typeof store.dispatch
