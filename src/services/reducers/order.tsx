import {
  CREATE_ORDER_NUMBER_FAILED,
  CREATE_ORDER_NUMBER_SERVER,
  CREATE_ORDER_NUMBER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  GET_ORDER_SERVER,
  DELETE_ORDER_NUMBER,
  TOrderActions,
} from "../actions/order";
import { TAppActions } from "../../utils/prop-types";
import { Reducer } from "redux";
import { TOrder } from "../../utils/prop-types";


export interface IOrderInitialState{
  order: number | null,
  orderData: TOrder,
  createOrderNumberRequest: boolean,
  createOrderNumberFailed: boolean,
  createOrderNumberSuccess: boolean,
  getOrderRequest: boolean,
  getOrderFailed: boolean,
}

export const initialState = {
  order: null,
  orderData: {    createdAt: '',
  ingredients: [],
  name: '',
  number: 0,
  owner: '',
  status: '',
  updatedAt: '',
  _id: '',
  __v: 0},
  createOrderNumberRequest: false,
  createOrderNumberFailed: false,
  createOrderNumberSuccess: false,
  getOrderRequest: false,
  getOrderFailed: false,
};

export const orderReducer: Reducer< IOrderInitialState, TOrderActions > = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case CREATE_ORDER_NUMBER_SERVER: {
      return {
        ...state,
        createOrderNumberRequest: true,
      };
    }
    case CREATE_ORDER_NUMBER_SUCCESS: {
        return {
          ...state,
          createOrderNumberFailed: false,
          createOrderNumberRequest: false,
          createOrderNumberSuccess: true,
          order: action.payload
        };
      }
    case CREATE_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        createOrderNumberFailed: true,
        createOrderNumberServer: false,
      };
    }
    case GET_ORDER_SERVER: {
      return {
        ...state,
        getOrderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        getOrderFailed: false,
        getOrderRequest: false,
        orderData: action.payload,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        getOrderRequest: false,
        getOrderFailed: true,
      };
    }
    case DELETE_ORDER_NUMBER: {
      return {
        ...state,
        order: null,
      };
    }
    default:
      return state;
  }
};