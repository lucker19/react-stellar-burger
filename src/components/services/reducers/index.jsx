import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { ingredientDetailsReducer } from "./ingredients-details";
import { burgerConstructorReducer } from './burger-constructor';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    ingredientDetails: ingredientDetailsReducer,
    burgerConstructor: burgerConstructorReducer
});