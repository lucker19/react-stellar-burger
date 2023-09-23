import { TIngredient } from "../../utils/prop-types";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const DELETE_ALL_INGREDIENTS = "DELETE_ALL_INGREDIENTS";
export const SORT_INGREDIENTS = "SORT_INGREDIENTS";

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: TIngredient;
}

export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: TIngredient;
}

export interface ISortIngredient {
  readonly type: typeof SORT_INGREDIENTS;
  readonly payload: {'fromIndex': number, 'toIndex': number};
}

export interface IDeleteAllIngredients {
  readonly type: typeof DELETE_ALL_INGREDIENTS;
  readonly payload: TIngredient;
}

export type TConstructorBurgerAction =
    IAddIngredient
  | IDeleteIngredient
  | ISortIngredient
  | IDeleteAllIngredients;

  export const addIngredient = (ingredient: TIngredient): IAddIngredient => ({ type: ADD_INGREDIENT, payload: ingredient });
  export const deleteIngredient = (ingredient: TIngredient): IDeleteIngredient => ({ type: DELETE_INGREDIENT,  payload: ingredient });
  export const sortIngredients = (index: { 'fromIndex': number, 'toIndex': number }): ISortIngredient => ({ type: SORT_INGREDIENTS, payload: index });