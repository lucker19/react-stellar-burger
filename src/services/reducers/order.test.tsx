import { orderReducer,initialState } from "./order";
import {
    CREATE_ORDER_NUMBER_FAILED,
    CREATE_ORDER_NUMBER_SERVER,
    CREATE_ORDER_NUMBER_SUCCESS,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    GET_ORDER_SERVER,
    DELETE_ORDER_NUMBER,
  } from "../actions/order";

  describe('order reducer', () => {
    it('should return initial state', () => {
      expect(orderReducer(initialState, {})).toEqual(initialState)
    })
  
    it('should handle GET_ORDER_SERVER', () => {
      const action = {
        type: GET_ORDER_SERVER,
      }
      expect(orderReducer(initialState, action)).toEqual(
        {
          ...initialState,
          orderRequest: true,
        }
      )
    })
  
    it('should handle GET_ORDER_SUCCESS', () => {
      const action = {
        type: GET_ORDER_SUCCESS,
        payload: 12345
      }
      expect(orderReducer(initialState, action)).toEqual(
        {
          ...initialState,
          orderNumber: 12345,
          orderRequest: false,
          orderFailed: false
        }
      )
    })
  
    it('should handle GET_ORDER_FAILED', () => {
      const action = {
        type: GET_ORDER_FAILED,
      }
      expect(orderReducer(initialState, action)).toEqual(
        {
          ...initialState,
          orderRequest: false,
          orderFailed: true
        }
      )
    })
  
    it('should handle DELETE_ORDER_NUMBER', () => {
      const action = {
        type: DELETE_ORDER_NUMBER,
      }
      expect(orderReducer(initialState, action)).toEqual(
        {
          ...initialState,
          orderNumber: null,
        }
      )
    })
  
  })