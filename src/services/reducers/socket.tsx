import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_CONNECTION_START,
} from "../actions/socket";
import { TAppActions } from "../../utils/prop-types";
import { TOrder } from "../../utils/prop-types";

type TInitialState = {
  wsConnected: boolean;
  wsStarted: boolean;
  orders: Array<TOrder> | [];
  total: null | number;
  totalToday: null | number;
};

export const initialState: TInitialState = {
  wsConnected: false,
  wsStarted: false,
  orders: [],
  total: null,
  totalToday: null,
};

export const socketReducer = (
  state = initialState,
  action: TAppActions
): TInitialState => {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {
        ...state,
        wsStarted: true,
      };
    }
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false,
      };
    }
    case WS_GET_ORDERS: {
      return {
        ...state,
        wsConnected: true,
        wsStarted: true,
        orders:
          state.orders.length < 10
            ? [...state.orders, ...action.payload.orders]
            : [...state.orders],
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    }
    default:
      return state;
  }
};
