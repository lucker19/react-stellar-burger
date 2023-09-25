import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order";
import { ingredientDetailsReducer } from "./ingredients-details";
import { burgerConstructorReducer } from "./burger-constructor";
import { userReducer } from "./user";
import { feedOrdersReducer } from "./orders-feed";
import { profileOrdersReducer } from "./profile-orders";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  ingredientDetails: ingredientDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  user: userReducer,
  feedOrders: feedOrdersReducer,
  profileOrders: profileOrdersReducer
});

export type RootState = ReturnType<typeof rootReducer>;
