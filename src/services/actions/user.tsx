import {
  forgotPasswordRequest,
  getUserRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
  resetPasswordRequest,
  updateUserProfileRequest,
} from "../../utils/api";
import { AppDispatch, IUser, TForm, TUser, TUserUpdate } from "../../utils/prop-types";
import { AppThunk } from "../../utils/prop-types";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";
export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';

interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

interface IGetUser {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: TUser;
}
export interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
}
export interface ISetAuthChecked {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly payload: boolean;
}
export interface ISetUser {
  readonly type: typeof SET_USER;
  payload: TUser
}
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}
export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
}
export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  payload: TUser
  data: TForm
}
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}
export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export interface IRegisterRequest {
  readonly type: typeof REGISTER_REQUEST;

}
export interface IRegisterFailed {
  readonly type: typeof REGISTER_FAILED;

}
export interface IRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS;
  payload: TUser
}
export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;

}
export interface IForgotPasswordFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED;

}
export interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;

}
export interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;

}
export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;

}
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;

}
export interface IUpdateUserfailed {
  readonly type: typeof UPDATE_USER_FAILED;

}
export interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
  payload: TUserUpdate

}
export type TUserActions =
  | IGetUserFailed
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
  | IGetUserRequest
  | IGetUser;
export const setAuthChecked = (value: boolean):ISetAuthChecked => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user: TUser): ISetUser => ({
  type: SET_USER,
  payload: user,
});


export function getUser() {
  return (dispatch: AppDispatch) => {
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
export function logIn(data: any) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: LOGIN_REQUEST });
    loginRequest(data)
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch(setUser(res));
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
export const checkUserAuth: AppThunk = () => {
  return function(dispatch: AppDispatch) {
      dispatch({ type: GET_USER_REQUEST });
      getUserRequest().then(res => {
          dispatch(setUser(res));
      }).catch(() => {
          dispatch({
              type: GET_USER_FAILED
          });
      });
  };
};
export const logOut: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: LOGOUT_REQUEST });
    logoutRequest()
        .then(() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch({ type: LOGOUT_SUCCESS });
        })
        .catch(() => {
          dispatch({ type: LOGOUT_FAILED });
        });
  };
}
export const registerUser: AppThunk = (data: TForm) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: REGISTER_REQUEST });
    registerRequest(data)
        .then(res => {
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            dispatch({
              type: REGISTER_SUCCESS,
              payload: res
            });
        })
        .catch(() => {
          dispatch({ type: REGISTER_FAILED });
        });
  };
}
export const updateUser: AppThunk = (data: TForm) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: UPDATE_USER_REQUEST });
    updateUserProfileRequest(data)
        .then(res => {
            dispatch({
              type: UPDATE_USER_SUCCESS,
              payload: res
            });
        })
        .catch(() => {
          dispatch({ type: UPDATE_USER_FAILED });
        });
  };
}
export const forgotPassword: AppThunk = (email: TForm) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    forgotPasswordRequest(email)
        .then(() => {
            dispatch({ type: FORGOT_PASSWORD_SUCCESS });
        })
        .catch(() => {
          dispatch({ type: FORGOT_PASSWORD_FAILED });
        });
  };
}
export const resetPassword: AppThunk = (password: TForm) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    resetPasswordRequest(password)
        .then(() => {
            dispatch({ type: RESET_PASSWORD_SUCCESS });
        })
        .catch(() => {
          dispatch({ type: RESET_PASSWORD_FAILED });
        });
  };
}