import { any } from "prop-types";
import { TIngredient,TIngredients } from "../../utils/prop-types";
import { 
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
} from "../actions/burger-constructor";
import { TConstructorBurgerAction } from "../actions/burger-constructor";

interface IConstructorBurgerState {
  fillings: TIngredients;
  buns: null | TIngredient;
}

const initialState: IConstructorBurgerState  = {
  buns: null,
  fillings: [],
};

export const burgerConstructorReducer = (state: IConstructorBurgerState = initialState, action: TConstructorBurgerAction) : IConstructorBurgerState  => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.payload.type === "bun") {
        return {
          ...state,
          buns: action.payload,
        };
      } else {
        return {
          ...state,
          fillings: [ ...state.fillings, action.payload ]
        };
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        fillings: state.fillings.filter((item: any)  => item.key !== action.payload)
    }
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

export default burgerConstructorReducer;
