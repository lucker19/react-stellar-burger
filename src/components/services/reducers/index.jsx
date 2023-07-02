import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { ingredientDetailsReducer } from "./ingredient-details";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    ingredientDetails: ingredientDetailsReducer
});