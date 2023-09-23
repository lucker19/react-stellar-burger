export const WS_PROFILE_ORDERS_CONNECT = "WS_PROFILE_ORDERS_CONNECT";
export const WS_PROFILE_ORDERS_DISCONNECT = "WS_PROFILE_ORDERS_DISCONNECT";
export const WS_PROFILE_ORDERS_CONNECTING = "WS_PROFILE_ORDERS_CONNECTING";
export const WS_PROFILE_ORDERS_OPEN = "WS_PROFILE_ORDERS_OPEN";
export const WS_PROFILE_ORDERS_CLOSE = "WS_PROFILE_ORDERS_CLOSE";
export const WS_PROFILE_ORDERS_MESSAGE = "WS_PROFILE_ORDERS_MESSAGE";
export const WS_PROFILE_ORDERS_ERROR = "WS_PROFILE_ORDERS_ERROR";

export interface IWsProfileOrdersConnect {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECT;
  readonly payload: string;
}
export interface IWsProfileOrdersDisconnect {
  readonly type: typeof WS_PROFILE_ORDERS_DISCONNECT;
}
export interface IWsProfileOrdersConnecting {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECTING;
}
export interface IWsProfileOrdersOpen {
  readonly type: typeof WS_PROFILE_ORDERS_OPEN;
}
export interface IWsProfileOrdersClose {
  readonly type: typeof WS_PROFILE_ORDERS_CLOSE;
}
export interface IWsProfileOrdersMessage {
  readonly type: typeof WS_PROFILE_ORDERS_MESSAGE;
  readonly payload: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0
  };
}
export interface IWsProfileOrdersError {
  readonly type: typeof WS_PROFILE_ORDERS_ERROR;
}

export type TWsProfileOrdersActions =
  | IWsProfileOrdersError
  | IWsProfileOrdersMessage
  | IWsProfileOrdersClose
  | IWsProfileOrdersOpen
  | IWsProfileOrdersConnecting
  | IWsProfileOrdersDisconnect
  | IWsProfileOrdersConnect;

export const wsProfileOrdersConnect = (url: string): IWsProfileOrdersConnect => ({
  type: WS_PROFILE_ORDERS_CONNECT,
  payload: url,
});

export const wsProfileOrdersDisconnect = (): IWsProfileOrdersDisconnect => ({
  type: WS_PROFILE_ORDERS_DISCONNECT,
});
