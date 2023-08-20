import { TIngredient } from "../../utils/prop-types";

export const ADD_INGREDIENTS_DETAILS = "ADD_INGREDIENTS_DETAILS";
export const DELETE_INGREDIENTS_DETAILS = "DELETE_INGREDIENTS_DETAILS";

export const addIngredientsDetails = (card: any) => ({
  type: ADD_INGREDIENTS_DETAILS,
  payload: card,
});
export const deleteIngredientsDetails = () => ({
  type: DELETE_INGREDIENTS_DETAILS,
});

interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENTS_DETAILS;
  payload: any;

  readonly ingredient: TIngredient;
}

interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENTS_DETAILS;
  payload: string
}

export type TIngredientDetailsActions =
  | IAddIngredientAction
  | IDeleteIngredientAction;
