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

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export function getUser() {
  return (dispatch) => {
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

export function logIn(data) {
  return function (dispatch) {
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
  return (dispatch) => {
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

export function logOut(data) {
  return function (dispatch) {
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

export function registerUser(data) {
  return function (dispatch) {
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

export function updateUser(data) {
  return function (dispatch) {
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

export function forgotPassword(email) {
  return function (dispatch) {
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

export function resetPassword(password) {
  return function (dispatch) {
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
