import { initialState, burgerConstructorReducer } from './burger-constructor';
import { TConstructorBurgerAction, ADD_INGREDIENT, DELETE_INGREDIENT, SORT_INGREDIENTS, DELETE_ALL_INGREDIENTS } from '../actions/burger-constructor';

describe('burgerConstructorReducer', () => {
it('should handle ADD_INGREDIENT for bun', () => {
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
    key: "key" };
const action: TConstructorBurgerAction = { type: ADD_INGREDIENT, payload };
const newState = burgerConstructorReducer(initialState, action);

expect(newState).toEqual({ ...initialState, buns: payload });
});


it('should handle DELETE_INGREDIENT', () => {
const payload = {     calories: 420,
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
    key: "key" };
const initialStateWithFillings = { ...initialState, fillings: [payload] };
const action: TConstructorBurgerAction = { type: DELETE_INGREDIENT, payload };
const newState = burgerConstructorReducer(initialStateWithFillings, action);

expect(newState).toEqual({ ...initialState, fillings: [] });
});

it('should handle SORT_INGREDIENTS', () => {
    const fillings = [ {
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
        key: "key1"
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
        key: "key2"
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
        key: "key3"
      },];
    const initialStateWithFillings = { ...initialState, fillings };
    const payload = { fromIndex: 0, toIndex: 2 };
    const action: TConstructorBurgerAction = { type: SORT_INGREDIENTS, payload };
    const newState = burgerConstructorReducer(initialStateWithFillings, action);
    
    expect(newState).toEqual({ ...initialState, fillings: [fillings[1], fillings[2], fillings[0]] });
    });

it('should handle DELETE_ALL_INGREDIENTS', () => {
const fillings = [{
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
    key: "key1"
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
    key: "key2"
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
    key: "key3"
  },];
const initialStateWithFillings = { ...initialState, fillings };
const action: any = { type: DELETE_ALL_INGREDIENTS };
const newState = burgerConstructorReducer(initialStateWithFillings, action);

expect(newState).toEqual(initialState);
});

});