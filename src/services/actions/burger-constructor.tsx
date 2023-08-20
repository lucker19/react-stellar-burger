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
  readonly payload: { dragIndex: number; hoverIndex: number };
  readonly toIndex: number;
  readonly fromIndex: number;
}

export interface IDeleteAllIngredients {
  readonly type: typeof DELETE_ALL_INGREDIENTS;
  readonly payload: string;
}

export type TConstructorBurgerAction =
  | IAddIngredient
  | IDeleteIngredient
  | ISortIngredient
  | IDeleteAllIngredients;

export const addIngredient = (payload: any) => ({
  type: ADD_INGREDIENT,
  payload,
});
export const deleteIngredient = (ingredient: TIngredient) => ({
  type: DELETE_INGREDIENT,
  ingredient,
});
export const sortIngredients = (fromIndex: number, toIndex: number) => ({
  type: SORT_INGREDIENTS,
  fromIndex: fromIndex,
  toIndex: toIndex,
});
