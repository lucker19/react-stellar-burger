import { socketReducer, initialState } from "./socket";
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS,
    WS_CONNECTION_START,
    TWsActions,
  } from "../actions/socket";

  describe('order details reducer', () => {
    it('should return the initial state', () => {
      expect(socketReducer(undefined, {} as any)).toEqual(
        initialState
      )
    })
  
    it('should handle WS_CONNECTION_SUCCESS', () => {
      const action:TWsActions = {
        type: WS_CONNECTION_SUCCESS,
      }
      expect(
        socketReducer(initialState, action)
      ).toEqual({
        ...initialState,
      })
    })
    it('should handle WS_CONNECTION_START', () => {
      const action:TWsActions = {
        type: WS_CONNECTION_START,
      }
      expect(
        socketReducer(initialState, action)
      ).toEqual({
        ...initialState,
      })
    })
    it('should handle WS_CONNECTION_CLOSED', () => {
      const action:TWsActions = {
        type: WS_CONNECTION_CLOSED,
      }
      expect(
        socketReducer(initialState, action)
      ).toEqual({
        ...initialState,
      })
    })
    it('should handle WS_CONNECTION_ERROR', () => {
      const action:TWsActions = {
        type: WS_CONNECTION_ERROR,
      }
      expect(
        socketReducer(initialState, action)
      ).toEqual({
        ...initialState,
      })
    })
    it('should handle WS_GET_ORDERS', () => {
      const order = {
        createdAt: "2023-07-25T13:12:49.721Z",
        ingredients: ['643d69a5c3f7b9001cfa0949', '643d69a5c3f7b9001cfa093f', '643d69a5c3f7b9001cfa0945', '643d69a5c3f7b9001cfa093d'],
        name: "Бессмертный антарианский флюоресцентный экзо-плантаго бургер",
        number: 14295,
        status: "done",
        updatedAt: "2023-07-25T13:12:49.850Z",
        _id: "64bfca5182e277001bfa3ccc"
      }
      const payload = {
        success: true,
        orders: [order,order,order],
        total: 123,
        totalToday: 123,
      }
      const action:any = {
        type: WS_GET_ORDERS,
        payload: payload,
        order: payload.orders
      }
      expect(
        socketReducer(initialState, action)
      ).toEqual({
        ...initialState,
        payload: payload,
        orders: payload.orders
      })
    })
  })