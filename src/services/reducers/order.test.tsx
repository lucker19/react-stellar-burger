import { Reducer } from 'redux';
import {
  CREATE_ORDER_NUMBER_SERVER,
  CREATE_ORDER_NUMBER_SUCCESS,
  CREATE_ORDER_NUMBER_FAILED,
  GET_ORDER_SERVER,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  DELETE_ORDER_NUMBER,
} from '../actions/order';
import {  TOrderActions } from '../actions/order';
import {  orderReducer, initialState } from './order';

describe('orderReducer', () => {
  it('should return the initial state by default', () => {
    expect(orderReducer(undefined, {} as TOrderActions)).toEqual(initialState);
  });

  it('should handle CREATE_ORDER_NUMBER_SERVER', () => {
    const action: any = {
      type: CREATE_ORDER_NUMBER_SERVER,
    };

    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      createOrderNumberRequest: true,
    });
  });


  it('should handle CREATE_ORDER_NUMBER_SUCCESS', () => {
    const sampleOrderNumber = 546;

    const action: TOrderActions = {
      type: CREATE_ORDER_NUMBER_SUCCESS,
      payload: sampleOrderNumber,
    };

    const expectedState = {
      ...initialState,
      createOrderNumberFailed: false,
      createOrderNumberRequest: false,
      createOrderNumberSuccess: true,
      order: sampleOrderNumber,
    };

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CREATE_ORDER_NUMBER_FAILED', () => {
    const action: any = {
      type: CREATE_ORDER_NUMBER_FAILED,
    };

    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      createOrderNumberFailed: true,
      createOrderNumberServer: false,
    });
  });

  it('should handle GET_ORDER_SERVER', () => {
    const action: TOrderActions = {
      type: GET_ORDER_SERVER,
    };

    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      getOrderRequest: true,
    });
  });

  it('should handle GET_ORDER_SUCCESS', () => {
    const exampleOrderData = {
      order_id: '123',
      order_details: 'Some details',
    };
    const action: TOrderActions = {
      type: GET_ORDER_SUCCESS,
      payload: exampleOrderData,
    };

    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      getOrderFailed: false,
      getOrderRequest: false,
      orderData: exampleOrderData,
    });
  });

  it('should handle GET_ORDER_FAILED', () => {
    const action: TOrderActions = {
      type: GET_ORDER_FAILED,
    };

    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      getOrderRequest: false,
      getOrderFailed: true,
    });
  });

  it('should handle DELETE_ORDER_NUMBER', () => {
    const action: TOrderActions = {
      type: DELETE_ORDER_NUMBER,
    };

    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      order: null,
    });
  });
});