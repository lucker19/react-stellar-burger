import { feedOrdersReducer, initialState } from "./orders-feed";
import {
    WS_ORDER_OPEN,
    WS_ORDER_CLOSE,
    WS_ORDER_MESSAGE,
    WS_ORDER_ERROR,
  } from "../actions/orders-feed";
  import { TOredersFEedActions } from "../actions/orders-feed";

  describe('order details reducer', () => {
    it('should return the initial state', () => {
      expect(feedOrdersReducer(undefined, {}as any)).toEqual(
        initialState
      )
    })
  


    it('should handle WS_ORDER_CLOSE', () => {
      const action:TOredersFEedActions = {
        type: WS_ORDER_CLOSE,
      }
      expect(
        feedOrdersReducer(initialState, action)
      ).toEqual({
        ...initialState,
      })
    })
    it('should handle WS_ORDER_ERROR', () => {
      const action:any = {
        type: WS_ORDER_ERROR,
      }
      expect(
        feedOrdersReducer(initialState, action)
      ).toEqual({
        ...initialState,
      })
    })
    it('should handle WS_ORDER_OPEN', () => {
      const action:TOredersFEedActions = {
        type: WS_ORDER_OPEN,
      }
      expect(
        feedOrdersReducer(initialState, action)
      ).toEqual({
        ...initialState,
      })
    })
    it('should handle WS_ORDER_MESSAGE', () => {
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
        type:WS_ORDER_MESSAGE,
        payload: payload,
        orders: payload.orders
      }
      expect(
        feedOrdersReducer(initialState, action)
      ).toEqual({
        ...initialState,
        payload: payload,
        orders: payload.orders
      })
    })
  })