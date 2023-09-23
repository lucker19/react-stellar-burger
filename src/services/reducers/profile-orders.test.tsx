import { profileOrdersReducer, TProfileOrdersInitialState } from '././profile-orders';

describe('profileOrdersReducer', () => {
const initialState: TProfileOrdersInitialState = {
status: false,
ordersData: {
success: true,
orders: [],
total: 0,
totalToday: 0,
},
wsConnected: '',
};

it('should return the initial state', () => {
expect(profileOrdersReducer(undefined, {} as any)).toEqual(initialState);
});

it('should handle WS_PROFILE_ORDERS_OPEN', () => {
const action = { type: 'WS_PROFILE_ORDERS_OPEN' };
const expectedState = {
...initialState,
status: true,
wsConnected: '',
};
expect(profileOrdersReducer(initialState, action)).toEqual(expectedState);
});

it('should handle WS_PROFILE_ORDERS_CLOSE', () => {
const action = { type: 'WS_PROFILE_ORDERS_CLOSE' };
const expectedState = {
...initialState,
status: false,
};
expect(profileOrdersReducer(initialState, action)).toEqual(expectedState);
});

it('should handle WS_PROFILE_ORDERS_ERROR', () => {
const action = { type: 'WS_PROFILE_ORDERS_ERROR' };
const expectedState = {
...initialState,
wsConnected: '',
};
expect(profileOrdersReducer(initialState, action)).toEqual(expectedState);
});

it('should handle WS_PROFILE_ORDERS_MESSAGE', () => {
const action = {
type: 'WS_PROFILE_ORDERS_MESSAGE',
payload: {
success: true,
orders: [],
total: 100,
totalToday: 50,
},
};
const expectedState = {
...initialState,
ordersData: action.payload,
};
expect(profileOrdersReducer(initialState, action)).toEqual(expectedState);
});

it('should return the current state for unknown action types', () => {
const action = { type: 'UNKNOWN_ACTION' };
expect(profileOrdersReducer(initialState, action)).toEqual(initialState);
});
});