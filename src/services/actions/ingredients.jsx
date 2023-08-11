import { getIngredientsServer } from "../../utils/api";  
export const GET_INGREDIENTS_SERVER = 'GET_INGREDIENTS_SERVER';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

export const getIngredients = () => {
  return function(dispatch) {
    dispatch({ type: GET_INGREDIENTS_SERVER });
    getIngredientsServer().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        });
      } else {
        dispatch({ type: GET_INGREDIENTS_FAILED });
      }
    }).catch(error => dispatch({
      type: GET_INGREDIENTS_FAILED,
      error
    }))
  };
}