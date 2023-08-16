import { ADD_INGREDIENTS_DETAILS, DELETE_INGREDIENTS_DETAILS } from "../actions/ingredients-details"


const initialState = {
  ingredientDetails: null
};

export const ingredientDetailsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_INGREDIENTS_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.payload
      };
    }
    case DELETE_INGREDIENTS_DETAILS: {
      return {
        ...state,
        ingredientDetails: null
      };
    }
    default:
      return state
  }
};