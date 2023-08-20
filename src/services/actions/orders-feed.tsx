export const WS_ORDER_CONNECT = "WS_ORDER_CONNECT";
export const WS_ORDER_DISCONNECT = "WS_ORDER_DISCONNECT";
export const WS_ORDER_CONNECTING = "WS_ORDER_CONNECTING";
export const WS_ORDER_OPEN = "WS_ORDER_OPEN";
export const WS_ORDER_CLOSE = " WS_ORDER_CLOSE";
export const WS_ORDER_MESSAGE = "WS_ORDER_MESSAGE";
export const WS_ORDER_ERROR = "WS_ORDER_ERROR";

export interface IWsOrederConnect {
  readonly type: typeof WS_ORDER_CONNECT;
}
export interface IWsOrderDisconnect {
  readonly type: typeof WS_ORDER_DISCONNECT;
}
export interface IWsOrderConnecting {
  readonly type: typeof WS_ORDER_CONNECTING;
  payload: string;
}
export interface IWsOrderOpen {
  readonly type: typeof WS_ORDER_OPEN;
}
export interface IWsOrderClose {
  readonly type: typeof WS_ORDER_CLOSE;
}
export interface IWsOrderMessage {
  readonly type: typeof WS_ORDER_MESSAGE;
  payload: string;
}
export interface IWsOrderError {
  readonly type: typeof WS_ORDER_ERROR;
  payload: string;
}

export type TOredersFEedActions =
  | IWsOrederConnect
  | IWsOrderDisconnect
  | IWsOrderConnecting
  | IWsOrderOpen
  | IWsOrderClose
  | IWsOrderMessage
  | IWsOrderError;

export const wsOrderConnect = (url: string) => ({
  type: WS_ORDER_CONNECT,
  payload: url,
});

export const wsOrderDisconnect = () => ({
  type: WS_ORDER_DISCONNECT,
});
