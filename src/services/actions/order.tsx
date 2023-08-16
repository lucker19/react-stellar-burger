import { getOrderServer } from "../../utils/api";

export const GET_ORDER_SERVER = "GET_ORDER_SERVER";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";

export interface IGetOrderServer {
  readonly type: typeof GET_ORDER_SERVER
}
export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED
}
export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS
}

export type TOrderActions = IGetOrderServer | IGetOrderFailed | IGetOrderSuccess

export const getOrder = (ingredientsId: any) => {
  return function (dispatch: any) {
    dispatch({ type: GET_ORDER_SERVER });
    getOrderServer(ingredientsId).then(({ success, order: { number } }) => {
      if (success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: number,
        });
      } else {
        dispatch({ type: GET_ORDER_FAILED });
      }
    }).catch(error => dispatch({
      type: GET_ORDER_FAILED,
      error
    }))
  };
};
