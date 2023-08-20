import { ingredientDetailsReducer, initialState } from "./ingredients-details";
import { ADD_INGREDIENTS_DETAILS, DELETE_INGREDIENTS_DETAILS } from "../actions/ingredients-details";
import { TIngredientDetailsActions } from "../actions/ingredients-details";

describe('ingredient details reducer', () => {
    it('should return initial state', () => {
      expect(ingredientDetailsReducer(undefined, {} as any)).toEqual(initialState)
    })
  
  
    it('should handle ADD_INGREDIENTS_DETAILS', () => {
      const action: any = {
        type: ADD_INGREDIENTS_DETAILS,
        payload: { test: 1 } as any
      }
      expect(ingredientDetailsReducer(initialState, action )).toEqual({ ingredient: { test: 1 } })
    })
  

  })