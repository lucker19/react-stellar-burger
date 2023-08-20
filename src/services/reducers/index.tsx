import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order";
import { ingredientDetailsReducer } from "./ingredients-details";
import { burgerConstructorReducer } from "./burger-constructor";
import { userReducer } from "./user";
import { socketReducer } from "./socket";
import { feedOrdersReducer } from "./orders-feed";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  ingredientDetails: ingredientDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  user: userReducer,
  socket: socketReducer,
  feedOrders: feedOrdersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
