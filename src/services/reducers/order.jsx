import { GET_ORDER_SERVER, GET_ORDER_FAILED, GET_ORDER_SUCCESS } from "../actions/order";

const initialState = {
  order: null,
  orderRequest: false,
  orderFailed: false
};

export const orderReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_ORDER_SERVER: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderRequest: false,
        order: action.order
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false
      };
    }
    default:
      return state;
  }
};