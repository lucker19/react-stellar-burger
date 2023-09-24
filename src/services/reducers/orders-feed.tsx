import {
  WS_ORDER_OPEN,
  WS_ORDER_CLOSE,
  WS_ORDER_MESSAGE,
  WS_ORDER_ERROR,
} from "../actions/orders-feed";
import { TOredersFEedActions } from "../actions/orders-feed";
import { TIngredients, TOrder } from "../../utils/prop-types";

export interface IOrdersFeedState {
  orders: {
    orders: TOrder[];
    total: number;
    totalToday: number
  };
  wsConnected: boolean;
  error: string
}

export const initialState: IOrdersFeedState = {
  wsConnected: false,
  orders: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  error: "",
};

export const feedOrdersReducer = (
  state = initialState,
  action: TOredersFEedActions
) => {
  switch (action.type) {
    case WS_ORDER_OPEN:
      return {
        ...state,
        wsConnected: true,
        error: "",
      };
    case WS_ORDER_CLOSE:
      return {
        ...state,
        wsConnected: false,
        error: "",
      };
      case WS_ORDER_ERROR:
        return {
          ...state,
          error: '',
          wsConnected: false
        };
    case WS_ORDER_MESSAGE:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};