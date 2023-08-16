import { TIngredient } from "../../utils/prop-types";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';

export interface IAddIngredient {
    readonly type: typeof ADD_INGREDIENT;
    readonly payload: TIngredient;
}

export interface IDeleteIngredient {
    readonly type: typeof DELETE_INGREDIENT;
    readonly payload: string;
}

export interface ISortIngredient {
    readonly type: typeof SORT_INGREDIENTS;
    readonly payload: { "dragIndex": number, "hoverIndex": number };
    readonly toIndex: any,
    readonly fromIndex: any
}

export type TConstructorBurgerAction = IAddIngredient | IDeleteIngredient | ISortIngredient;

export const addIngredient = (payload: any) => ({ type:  ADD_INGREDIENT, payload });
export const deleteIngredient = (ingredient: TIngredient) => ({ type:  DELETE_INGREDIENT,  ingredient });
export const sortIngredients = (fromIndex: number, toIndex: number) => ({ type:  SORT_INGREDIENTS, fromIndex: fromIndex, toIndex: toIndex});