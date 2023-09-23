import { TAppActions } from "../../utils/prop-types";
import {
  GET_INGREDIENTS_SERVER,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  TIngredientsActions,
} from "../actions/ingredients";

export const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_INGREDIENTS_SERVER: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredientsRequest: false,
        ingredients: action.payload,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredients: [],
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }
    default:
      return state;
  }
};
