import { ingredientsReducer, initialState } from "./ingredients";
import { GET_INGREDIENTS_SERVER,GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS, TIngredientsActions } from "../actions/ingredients";

describe('ingredientsReducer', () => {
  it('should return the initial state', () => {
  expect(ingredientsReducer(undefined, {})).toEqual(initialState);
  });
  
  it('should handle GET_INGREDIENTS_SERVER', () => {
  const action = { type: 'GET_INGREDIENTS_SERVER' };
  const expectedState = {
  ...initialState,
  ingredientsRequest: true,
  };
  expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });
  
  it('should handle GET_INGREDIENTS_SUCCESS', () => {
  const payload = [{
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
  },
  {
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
  },
  {
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
  },];
  const action = {
  type: 'GET_INGREDIENTS_SUCCESS',
  payload: payload,
  };
  const expectedState = {
  ...initialState,
  ingredientsFailed: false,
  ingredientsRequest: false,
  ingredients: payload,
  };
  expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });
  
  it('should handle GET_INGREDIENTS_FAILED', () => {
  const action = { type: 'GET_INGREDIENTS_FAILED' };
  const expectedState = {
  ...initialState,
  ingredients: [],
  ingredientsFailed: true,
  ingredientsRequest: false,
  };
  expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });
  });