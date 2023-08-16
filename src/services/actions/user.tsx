import {
  forgotPasswordRequest,
  getUserRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
  resetPasswordRequest,
  updateUserProfileRequest,
} from "../../utils/api";

export const GET_USER_FAILED = "GET_USER_FAILED";
export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";

export interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED
}
export interface ISetAuthChecked {
  readonly type: typeof SET_AUTH_CHECKED
}
export interface ISetUser {
  readonly type: typeof SET_USER
}

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST
}
export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED
}
export interface ILoginSuccess{
  readonly type: typeof LOGIN_SUCCESS
}

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export interface ILogoutRequest{
  readonly type: typeof LOGOUT_REQUEST
}
export interface ILogoutFailed{
  readonly type: typeof LOGOUT_FAILED
}
export interface ILogoutSuccess{
  readonly type: typeof LOGOUT_SUCCESS
}

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export interface IRegisterRequest{
  readonly type: typeof REGISTER_REQUEST
}
export interface IRegisterFailed{
  readonly type: typeof REGISTER_FAILED
}
export interface IRegisterSuccess{
  readonly type: typeof REGISTER_SUCCESS
}

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";

export interface IForgotPasswordRequest{
  readonly type: typeof FORGOT_PASSWORD_REQUEST
}
export interface IForgotPasswordFailed{
  readonly type: typeof FORGOT_PASSWORD_FAILED
}
export interface IForgotPasswordSuccess{
  readonly type: typeof FORGOT_PASSWORD_SUCCESS
}

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";

export interface IResetPasswordRequest{
  readonly type: typeof RESET_PASSWORD_REQUEST
}
export interface IResetPasswordFailed{
  readonly type: typeof RESET_PASSWORD_FAILED
}
export interface IResetPasswordSuccess{
  readonly type: typeof RESET_PASSWORD_SUCCESS
}

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";

export interface IUpdateUserRequest{
  readonly type: typeof UPDATE_USER_REQUEST
}
export interface IUpdateUserfailed{
  readonly type: typeof UPDATE_USER_FAILED
}
export interface IUpdateUserSuccess{
  readonly type: typeof UPDATE_USER_SUCCESS
}

export type TUserActions = IGetUserFailed 
| ISetAuthChecked
| ISetUser 
| ILoginFailed 
| ILoginRequest 
| ILoginSuccess 
| ILogoutFailed 
| ILogoutRequest 
| ILogoutSuccess 
| IRegisterFailed 
| IRegisterRequest 
| IRegisterSuccess 
| IForgotPasswordFailed
| IForgotPasswordRequest
| IForgotPasswordSuccess
| IResetPasswordFailed
| IResetPasswordRequest
| IResetPasswordSuccess
| IUpdateUserRequest
| IUpdateUserSuccess
| IUpdateUserfailed

export const setAuthChecked = (value : any) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user : any) => ({
  type: SET_USER,
  payload: user,
});

export function getUser() {
  return (dispatch : any) => {
    return getUserRequest()
      .then((res) => {
        if (res && res.success) {
          dispatch(setUser(res.user));
        } else {
          dispatch({ type: GET_USER_FAILED });
        }
      })
      .catch(() => {
        dispatch({ type: LOGIN_FAILED });
      });
  };
}

export function logIn(data : any) {
  return function (dispatch : any) {
    dispatch({ type: LOGIN_REQUEST });
    loginRequest(data)
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch(setUser(res.user));
          dispatch(setAuthChecked(true));
        } else {
          dispatch({ type: LOGIN_FAILED });
        }
      })
      .catch(() => {
        dispatch({ type: LOGIN_FAILED });
      });
  };
}

export const checkUserAuth = () => {
  return (dispatch : any) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export function logOut(data : any) {
  return function (dispatch : any) {
    dispatch({ type: LOGOUT_REQUEST });
    logoutRequest(data)
      .then((res) => {
        if (res && res.success) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch({ type: LOGOUT_SUCCESS });
          dispatch(setUser(null));
        } else {
          dispatch({ type: LOGOUT_FAILED });
        }
      })
      .catch(() => {
        dispatch({ type: LOGOUT_FAILED });
      });
  };
}

export function registerUser(data : any) {
  return function (dispatch : any) {
    dispatch({ type: REGISTER_REQUEST });
    registerRequest(data)
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch({
            type: REGISTER_SUCCESS,
            data: res.user,
          });
        } else {
          dispatch({ type: REGISTER_FAILED });
        }
      })
      .catch(() => {
        dispatch({ type: REGISTER_FAILED });
      });
  };
}

export function updateUser(data : any) {
  return function (dispatch : any) {
    dispatch({ type: UPDATE_USER_REQUEST });
    updateUserProfileRequest(data)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            data: res.user,
          });
        } else {
          dispatch({ type: UPDATE_USER_FAILED });
        }
      })
      .catch(() => {
        dispatch({ type: UPDATE_USER_FAILED });
      });
  };
}

export function forgotPassword(email : any) {
  return function (dispatch : any) {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    forgotPasswordRequest(email)
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: FORGOT_PASSWORD_SUCCESS });
        } else {
          dispatch({ type: FORGOT_PASSWORD_FAILED });
        }
      })
      .catch(() => {
        dispatch({ type: FORGOT_PASSWORD_FAILED });
      });
  };
}

export function resetPassword(password : any) {
  return function (dispatch : any) {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    resetPasswordRequest(password)
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: RESET_PASSWORD_SUCCESS });
        } else {
          dispatch({ type: RESET_PASSWORD_FAILED });
        }
      })
      .catch(() => {
        dispatch({ type: RESET_PASSWORD_FAILED });
      });
  };
}

