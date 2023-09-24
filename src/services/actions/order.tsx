import { getOrderServer, getOrderNumberRequest } from "../../utils/api";
import { AppDispatch, TIngredient, TOrder } from "../../utils/prop-types";
import { DELETE_ALL_INGREDIENTS } from "./burger-constructor";
import { AppThunk } from "../../utils/prop-types";

export const GET_ORDER_SERVER = "GET_ORDER_SERVER";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";

export const CREATE_ORDER_NUMBER_SERVER = "CREATE_ORDER_NUMBER_REQUEST";
export const CREATE_ORDER_NUMBER_FAILED = "CREATE_ORDER_NUMBER_FAILED";
export const CREATE_ORDER_NUMBER_SUCCESS = "CREATE_ORDER_NUMBER_SUCCESS";
export const DELETE_ORDER_NUMBER = "DELETE_ORDER_NUMBER";

export const ADD_INGREDIENT_ID = 'ADD_INGREDIENT_ID';

export interface IAddIngredientId {
    readonly type: typeof ADD_INGREDIENT_ID;
    readonly payload: TIngredient['_id'];
}

export interface IGetOrderServer {
  readonly type: typeof GET_ORDER_SERVER;
  payload?: string;
  id?: string;
}
export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
  payload?: string
  
}
export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  payload: any
}

export interface ICreateOrderNumberServer {
  readonly type: typeof CREATE_ORDER_NUMBER_SERVER;

}
export interface ICreateOrderNumberFailed {
  readonly type: typeof CREATE_ORDER_NUMBER_FAILED;

}
export interface ICreateOrderNumberSuccess {
  readonly type: typeof CREATE_ORDER_NUMBER_SUCCESS;
  
  readonly payload: number;
}
export interface IDeleteOrderNumber {
  readonly type: typeof DELETE_ORDER_NUMBER;
  payload?: string
}

export type TOrderActions =
  | IGetOrderServer
  | IGetOrderFailed
  | IGetOrderSuccess
  | IDeleteOrderNumber
  | ICreateOrderNumberSuccess
  | ICreateOrderNumberFailed
  | ICreateOrderNumberServer;

  export const createOrderNumber: AppThunk = (ingredientsId: string[]) => {
    return function(dispatch: AppDispatch) {
      dispatch({ type: CREATE_ORDER_NUMBER_SERVER });
      getOrderNumberRequest(ingredientsId)
          .then((res) => {
              dispatch({
                type: CREATE_ORDER_NUMBER_SUCCESS,
                payload: res.order.number,
              });
          })
          .catch(() => {
            dispatch({ type: CREATE_ORDER_NUMBER_FAILED });
          });
    };
  };
export function getOrder(number: string | undefined) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: GET_ORDER_SERVER });
    getOrderServer(number)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            payload: res.orders[0],
          });
          dispatch({ type: DELETE_ALL_INGREDIENTS });
        } else {
          dispatch({ type: GET_ORDER_FAILED });
        }
      })
      .catch(() => {
        dispatch({ type: GET_ORDER_FAILED });
        dispatch({ type: DELETE_ALL_INGREDIENTS });
      });
  };
}

export const addIngredientId = (ingredient: TIngredient): IAddIngredientId => {
  return {
      type: ADD_INGREDIENT_ID,
      payload: ingredient._id
  }
}