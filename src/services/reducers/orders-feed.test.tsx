import { feedOrdersReducer, IOrdersFeedState } from './orders-feed';
import { WS_ORDER_OPEN, WS_ORDER_CLOSE, WS_ORDER_ERROR, WS_ORDER_MESSAGE } from '../actions/orders-feed';
import { TOredersFEedActions } from "../actions/orders-feed";

describe('feedOrdersReducer', () => {
const initialState: IOrdersFeedState = {
wsConnected: false,
orders: {
orders: [],
total: 0,
totalToday: 0,
},
error: '',
};

it('should return the initial state', () => {
expect(feedOrdersReducer(undefined, {} as any)).toEqual(initialState);
});

it('should handle WS_ORDER_OPEN', () => {
const action: TOredersFEedActions = { type: WS_ORDER_OPEN };
const expectedState = {
...initialState,
wsConnected: true,
error: '',
};
expect(feedOrdersReducer(initialState, action)).toEqual(expectedState);
});


it('should handle WS_ORDER_CLOSE', () => {
const action: TOredersFEedActions = { type: WS_ORDER_CLOSE };
const expectedState = {
...initialState,
wsConnected: false,
error: '',
};
expect(feedOrdersReducer(initialState, action)).toEqual(expectedState);
});


it('should handle WS_ORDER_ERROR', () => {
const action: TOredersFEedActions  = { type: WS_ORDER_ERROR };
const expectedState = {
...initialState,
error: '',
wsConnected: false,
};
expect(feedOrdersReducer(initialState, action)).toEqual(expectedState);
});


it('should handle WS_ORDER_MESSAGE', () => {
const payload = {
orders: [
{ id: 1, name: 'Order 1' },
{ id: 2, name: 'Order 2' },
],
total: 2,
totalToday: 1,
};
const action: any = { type: WS_ORDER_MESSAGE, payload };
const expectedState = {
...initialState,
orders: payload,
};
expect(feedOrdersReducer(initialState, action)).toEqual(expectedState);
});


it('should return the current state for unknown action types', () => {
const action: any = { type: 'UNKNOWN_ACTION' };
expect(feedOrdersReducer(initialState, action)).toEqual(initialState);
});
});