export const ADD_INGREDIENTS_DETAILS = 'ADD_INGREDIENTS_DETAILS';
export const DELETE_INGREDIENTS_DETAILS = 'DELETE_INGREDIENTS_DETAILS';

export const addIngredientsDetails = (card) => ({ type: ADD_INGREDIENTS_DETAILS, payload: card });
export const deleteIngredientsDetails = () => ({ type: DELETE_INGREDIENTS_DETAILS });