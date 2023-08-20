import { userReducer, initialState } from "./user";
import {
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    GET_USER_FAILED,
    LOGIN_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    REGISTER_FAILED,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    UPDATE_USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    SET_AUTH_CHECKED,
    SET_USER,
    TUserActions,
  } from "../actions/user";

  describe('user reducer', () => {
    const user = {
      "email": "test@yandex.ru",
      "password": "1234"
    }
    const accessToken = "accessToken"
    const refreshToken = "refreshToken"
    it('should return the initial state', () => {
      expect(userReducer(undefined, {} as any)).toEqual(
        initialState
      )
    })
  
  
    it('should handle SET_AUTH_CHECKED', () => {
      const action: any = {
        type: SET_AUTH_CHECKED,
        authChecked: true
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        isAuthChecked: true
      })
    })
  
    it('should handle SET_USER', () => {
      const action: any = {
        type: SET_USER,
        user: user
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        user: user
      })
    })
  
    it('should handle GET_USER_FAILED', () => {
      const action: any = {
        type: GET_USER_FAILED,
        user: null
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        user: null
      })
    })
  
    it('should handle REGISTER_REQUEST', () => {
      const action: any = {
        type: REGISTER_REQUEST,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        userRequest: true,
        userRegisterSuccess: false,
      })
    })
  
    it('should handle REGISTER_SUCCESS', () => {
      const action: any = {
        type: REGISTER_SUCCESS,
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        userFailed: false,
        userRequest: false,
        isAuthChecked: true,
        userRegisterSuccess: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user,
      })
    })
  
    it('should handle REGISTER_FAILED', () => {
      const action: any = {
        type: REGISTER_FAILED,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        userFailed: true,
        userRequest: false,
      })
    })
  
    it('should handle LOGIN_REQUEST', () => {
      const action: any = {
        type: LOGIN_REQUEST,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        userRequest: true,
      })
    })
  
    it('should handle LOGIN_SUCCESS', () => {
      const action: any = {
        type: LOGIN_SUCCESS,
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        userFailed: false,
        userRequest: false,
        isAuthChecked: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user,
      })
    })
  
    it('should handle LOGOUT_FAILED', () => {
      const action: any = {
        type: LOGOUT_FAILED,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        userFailed: true,
        userRequest: false
      })
    })
  
    it('should handle LOGOUT_REQUEST', () => {
      const action: any = {
        type: LOGOUT_REQUEST,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        userRequest: true
      })
    })
  
    it('should handle LOGOUT_SUCCESS', () => {
      const action: any = {
        type: LOGOUT_SUCCESS,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        userFailed: false,
        userRequest: false,
        isAuthChecked: true,
        userLoginSuccess: false,
        accessToken: null,
        refreshToken: null,
        user: null,
      })
    })
  
    it('should handle LOGIN_FAILED', () => {
      const action: any = {
        type: LOGIN_FAILED,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        userFailed: true,
        userRequest: false
      })
    })
  
    it('should handle FORGOT_PASSWORD_REQUEST', () => {
      const action: any = {
        type: FORGOT_PASSWORD_REQUEST,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        userRequest: true
      })
    })
  
    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
      const message = "message"
      const action: any = {
        type: FORGOT_PASSWORD_SUCCESS,
        message: message
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        userFailed: false,
        message: message,
        userRequest: false,
      })
    })
  
    it('should handle FORGOT_PASSWORD_FAILED', () => {
      const action: any = {
        type: FORGOT_PASSWORD_FAILED,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        userFailed: true,
        userRequest: false,
      })
    })
  
    it('should handle RESET_PASSWORD_REQUEST', () => {
      const action: any = {
        type: RESET_PASSWORD_REQUEST,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        userRequest: true,
        resetPasswordSuccess: false,
      })
    })
  
    it('should handle RESET_PASSWORD_SUCCESS', () => {
      const message = "message"
  
      const action: any = {
        type: RESET_PASSWORD_SUCCESS,
        message: message
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        userFailed: false,
        message: message,
        userRequest: false,
        resetPasswordSuccess: true,
      })
    })
  
    it('should handle RESET_PASSWORD_FAILED', () => {
  
      const action: any = {
        type: RESET_PASSWORD_FAILED,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        userFailed: true,
        userRequest: false,
      })
    })
  
    it('should handle UPDATE_USER_REQUEST', () => {
  
      const action: any = {
        type: UPDATE_USER_REQUEST,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        userRequest: true,
      })
    })
    it('should handle UPDATE_USER_SUCCESS', () => {
  
      const action: any= {
        type: UPDATE_USER_SUCCESS,
        user: user
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        user: user,
        userFailed: false,
        userRequest: false,
      })
    })
  
    it('should handle UPDATE_USER_FAILED', () => {
  
      const action: any = {
        type: UPDATE_USER_FAILED,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        userFailed: true,
        userRequest: false,
      })
    })
  })