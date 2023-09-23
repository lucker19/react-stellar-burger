import { getIngredientsServer } from "../../utils/api";
import { TIngredient } from "../../utils/prop-types";
import { AppThunk, AppDispatch } from "../../utils/prop-types";

export const GET_INGREDIENTS_SERVER = "GET_INGREDIENTS_SERVER";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";

interface IGetIngredientsServer {
  readonly type: typeof GET_INGREDIENTS_SERVER;
}

interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: TIngredient[];
}

export type TIngredientsActions =
  | IGetIngredientsServer
  | IGetIngredientsFailed
  | IGetIngredientsSuccess;

  export const getIngredients: AppThunk = () => {
    return function(dispatch: AppDispatch) {
      dispatch({ type: GET_INGREDIENTS_SERVER });
      getIngredientsServer()
          .then(res => {
              dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                payload: res.data
              });
          })
          .catch(() => {
            dispatch({ type: GET_INGREDIENTS_FAILED });
          })
    };
  };