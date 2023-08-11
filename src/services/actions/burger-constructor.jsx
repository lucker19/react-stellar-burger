export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';

export const addIngredient = (payload) => ({ type: ADD_INGREDIENT, payload });
export const deleteIngredient = (ingredient) => ({ type: DELETE_INGREDIENT,  ingredient });
export const sortIngredients = (fromIndex, toIndex) => ({ type: SORT_INGREDIENTS, fromIndex: fromIndex, toIndex: toIndex});