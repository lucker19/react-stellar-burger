import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS
} from "../actions/burger-constructor";

const initialState = {
  buns: null,
  fillings: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.payload.type === 'bun') {
        return {
          buns: action.payload,
          fillings: state.fillings
        };
      } else {
          return {
            ...state,
          fillings: [...state.fillings, action.payload]
        };
      }
    }
    case DELETE_INGREDIENT: {
      const index = state.fillings.indexOf(action.ingredient);
      if (index > -1) {
        state.fillings.splice(index, 1);
      }
      return {
        ...state,
        fillings: [...state.fillings]
      };
    }
    case SORT_INGREDIENTS: {
      const main = [...state.fillings];
      main.splice(action.toIndex, 0, main.splice(action.fromIndex, 1)[0]);
      return {
        ...state,
        fillings: [...main]
      };
    }
    default:
      return state;
  }
};