import thunk from "redux-thunk";
import { rootReducer } from "../services/reducers/index";
import { socketMiddleware } from "./middleware";
import { wsUrl, userOrdersUrl } from "./api";
import { configureStore } from "@reduxjs/toolkit";
import {
  WS_ORDER_CONNECT,
  WS_ORDER_DISCONNECT,
  WS_ORDER_CONNECTING,
  WS_ORDER_OPEN,
  WS_ORDER_CLOSE,
  WS_ORDER_MESSAGE,
  WS_ORDER_ERROR,
} from "../services/actions/orders-feed";
import {
  WS_PROFILE_ORDERS_CONNECT,
  WS_PROFILE_ORDERS_DISCONNECT,
  WS_PROFILE_ORDERS_CONNECTING,
  WS_PROFILE_ORDERS_OPEN,
  WS_PROFILE_ORDERS_CLOSE,
  WS_PROFILE_ORDERS_ERROR,
  WS_PROFILE_ORDERS_MESSAGE,
} from "../services/actions/profile-orders";

const feedMiddleware = {
  wsConnect: WS_ORDER_CONNECT,
  wsDisconnect: WS_ORDER_DISCONNECT,
  wsConnecting: WS_ORDER_CONNECTING,
  onOpen: WS_ORDER_OPEN,
  onClose: WS_ORDER_CLOSE,
  onMessage: WS_ORDER_MESSAGE,
  onError: WS_ORDER_ERROR,
};

const profileOrdersMiddleware = {
  wsConnect: WS_PROFILE_ORDERS_CONNECT,
  wsDisconnect: WS_PROFILE_ORDERS_DISCONNECT,
  wsConnecting: WS_PROFILE_ORDERS_CONNECTING,
  onOpen: WS_PROFILE_ORDERS_OPEN,
  onClose: WS_PROFILE_ORDERS_CLOSE,
  onError: WS_PROFILE_ORDERS_ERROR,
  onMessage: WS_PROFILE_ORDERS_MESSAGE,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: [
    thunk,
    socketMiddleware(feedMiddleware),
    socketMiddleware(profileOrdersMiddleware),
  ],
  devTools: true,
});
