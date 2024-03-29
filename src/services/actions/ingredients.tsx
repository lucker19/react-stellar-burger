import { getIngredientsServer } from "../../utils/api";
import { TIngredient } from "../../utils/prop-types";

export const GET_INGREDIENTS_SERVER = "GET_INGREDIENTS_SERVER";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";

export interface IGetIngredientsServer {
  readonly type: typeof GET_INGREDIENTS_SERVER;
  readonly payload: Array<TIngredient>;
}
export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
  payload: string
}
export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  payload: string
}

export type TIngredientsActions =
  | IGetIngredientsServer
  | IGetIngredientsFailed
  | IGetIngredientsSuccess;

export const getIngredients = () => {
  return function (dispatch: any) {
    dispatch({ type: GET_INGREDIENTS_SERVER });
    getIngredientsServer()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data,
          });
        } else {
          dispatch({ type: GET_INGREDIENTS_FAILED });
        }
      })
      .catch((error) =>
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          error,
        })
      );
  };
};
