import { getOrderServer, getOrderNumberRequest } from "../../utils/api";
import { TIngredient, TOrder } from "../../utils/prop-types";
import { DELETE_ALL_INGREDIENTS } from "./burger-constructor";

export const GET_ORDER_SERVER = "GET_ORDER_SERVER";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";

export const CREATE_ORDER_NUMBER_SERVER = "CREATE_ORDER_NUMBER_REQUEST";
export const CREATE_ORDER_NUMBER_FAILED = "CREATE_ORDER_NUMBER_FAILED";
export const CREATE_ORDER_NUMBER_SUCCESS = "CREATE_ORDER_NUMBER_SUCCESS";
export const DELETE_ORDER_NUMBER = "DELETE_ORDER_NUMBER";

export interface IGetOrderServer {
  readonly type: typeof GET_ORDER_SERVER;
  payload: string
}
export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
  payload: string
  
}
export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  payload: string
}

export interface ICreateOrderNumberServer {
  readonly type: typeof CREATE_ORDER_NUMBER_SERVER;
  payload: string
}
export interface ICreateOrderNumberFailed {
  readonly type: typeof CREATE_ORDER_NUMBER_FAILED;
  payload: string
}
export interface ICreateOrderNumberSuccess {
  readonly type: typeof CREATE_ORDER_NUMBER_SUCCESS;
  order: number;
  payload: string
}
export interface IDeleteOrderNumber {
  readonly type: typeof DELETE_ORDER_NUMBER;
  payload: string
}

export type TOrderActions =
  | IGetOrderServer
  | IGetOrderFailed
  | IGetOrderSuccess
  | IDeleteOrderNumber
  | ICreateOrderNumberSuccess
  | ICreateOrderNumberFailed
  | ICreateOrderNumberServer;

export const createOrderNumber = (ingredientsId: any) => {
  return function (dispatch: any) {
    dispatch({ type: CREATE_ORDER_NUMBER_SERVER });
    getOrderNumberRequest(ingredientsId)
      .then(({ success, order: { number } }) => {
        if (success) {
          dispatch({
            type: CREATE_ORDER_NUMBER_SUCCESS,
            order: number,
          });
        } else {
          dispatch({ type: CREATE_ORDER_NUMBER_FAILED });
        }
      })
      .catch(() => {
        dispatch({ type: CREATE_ORDER_NUMBER_FAILED });
      });
  };
};

export function getOrder(number: any) {
  return function (dispatch: any) {
    dispatch({ type: GET_ORDER_SERVER });
    getOrderServer(number)
      .then((res: any) => {
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