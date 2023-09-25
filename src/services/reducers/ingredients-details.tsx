import {
  ADD_INGREDIENTS_DETAILS,
  DELETE_INGREDIENTS_DETAILS,
  TIngredientDetailsActions,
} from "../actions/ingredients-details";
import { TIngredient } from "../../utils/prop-types";

export type TIngredientDetailsInitialState = {
  ingredientDetails: TIngredient | null;
};

export const initialState: TIngredientDetailsInitialState = {
  ingredientDetails: null,
};

export const ingredientDetailsReducer = (
  state = initialState,
  action: TIngredientDetailsActions
) => {
  switch (action.type) {
    case ADD_INGREDIENTS_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.payload,
      };
    }
    case DELETE_INGREDIENTS_DETAILS: {
      return {
        ...state,
        ingredientDetails: null,
      };
    }
    default:
      return state;
  }
};
