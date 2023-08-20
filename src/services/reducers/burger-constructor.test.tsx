import {burgerConstructorReducer, initialState} from "./burger-constructor";

import { ADD_INGREDIENT, DELETE_INGREDIENT, DELETE_ALL_INGREDIENTS, SORT_INGREDIENTS, TConstructorBurgerAction } from "../actions/burger-constructor";
import { TIngredientsActions } from "../actions/ingredients";

describe('order details reducer', () => {
    const ingredient = {
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
    }
    const ingredients = [
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
      },
    ]
  
    it('should return the initial state', () => {
      expect(burgerConstructorReducer(initialState, {} as any)).toEqual(
        initialState
      )
    })
  
    it('should handle ADD_INGREDIENT', () => {
      const action:TConstructorBurgerAction = {
        type: ADD_INGREDIENT,
        payload: ingredient
      }
      expect(
        burgerConstructorReducer(initialState, action)
      ).toEqual({
        ...initialState,
        fillings: [...initialState.fillings, ingredient]
      })
    })
  
    it('should handle SORT_INGREDIENTS', () => {
      const action:any = {
        type: SORT_INGREDIENTS,
        payload:  {
            fromIndex: 0,
            toIndex: 1
        }
      }
      expect(
        burgerConstructorReducer(initialState, action)
      ).toEqual({
        ...initialState,
        fillings: ingredients
      })
    })
  
  
    it('should handle DELETE_INGREDIENT_CONSTRUCTOR', () => {
      const key = "key1"
      const action: any = {
        type: DELETE_INGREDIENT,
        key: key
      }
      expect(
        burgerConstructorReducer(initialState, action)
      ).toEqual({
        ...initialState,
        fillings: initialState.fillings.filter((el) => el.key !== key),
      })
    })
  
    it('should handle DELETE_All_INGREDIENT', () => {
      const action: any = {
        type: DELETE_ALL_INGREDIENTS,
      }
      expect(
        burgerConstructorReducer(initialState, action)
      ).toEqual({
        ...initialState,
        fillings: [],
        buns: null
      })
    })
  })