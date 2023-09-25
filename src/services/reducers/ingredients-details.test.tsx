import { ingredientDetailsReducer, TIngredientDetailsInitialState } from './ingredients-details';
import { ADD_INGREDIENTS_DETAILS, DELETE_INGREDIENTS_DETAILS,TIngredientDetailsActions, } from '../actions/ingredients-details';

describe('ingredientDetailsReducer', () => {
const initialState: TIngredientDetailsInitialState = {
ingredientDetails: null,
};

it('should return the initial state', () => {
expect(ingredientDetailsReducer(undefined, {} as any)).toEqual(initialState);
});

it('should handle ADD_INGREDIENTS_DETAILS', () => {
const payload = {           
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    name: "Краторная булка N-200i",
    price: 1255,
    proteins: 80,
    type: "bun",
    __v: 0,
    _id: "_id",
    id: "id",
    key: "key" 
};
const action: TIngredientDetailsActions = { type: ADD_INGREDIENTS_DETAILS, payload };
const expectedState = { ingredientDetails: payload };
expect(ingredientDetailsReducer(initialState, action)).toEqual(expectedState);
});

it('should handle DELETE_INGREDIENTS_DETAILS', () => {
const action: TIngredientDetailsActions = { type: DELETE_INGREDIENTS_DETAILS };
const expectedState = { ingredientDetails: null };
expect(ingredientDetailsReducer(initialState, action)).toEqual(expectedState);
});

it('should return the current state for unknown action types', () => {
const action: any = { type: 'UNKNOWN_ACTION' };
expect(ingredientDetailsReducer(initialState, action)).toEqual(initialState);
});
});