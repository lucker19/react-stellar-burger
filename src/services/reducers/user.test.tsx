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

  describe('userReducer', () => {
    it('should return the initial state by default', () => {
      expect(userReducer(undefined, {} as TUserActions)).toEqual(initialState);
    });
    it('should handle SET_AUTH_CHECKED', () => {
      const action: TUserActions = {
        type: SET_AUTH_CHECKED,
        payload: true,
      };
  
      const expectedState = {
        ...initialState,
        isAuthChecked: true,
      };
  
      expect(userReducer(initialState, action)).toEqual(expectedState);
    });
    it('should handle SET_USER', () => {
        const payloadData = {
          id: '12345',
          name: 'nikita',
        };
    
        const action: any = {
          type: SET_USER,
          payload: payloadData,
        };
    
        const expectedState = {
          ...initialState,
          user: payloadData,
        };
    
        expect(userReducer(initialState, action)).toEqual(expectedState);
      });

      it('should handle GET_USER_FAILED', () => {
    const action: any = {
            type: GET_USER_FAILED,
            payload: true,
          };
        const expectedState = {
        ...initialState,
        user: null,
        getUserRequest: false,
        getUserFailed: true,
        };
        
        const newState = userReducer(initialState, action);
        expect(newState).toEqual(expectedState);
        });

  it('should handle LOGIN_REQUEST', () => {
    const action: any = {
      type: LOGIN_REQUEST,
    };

    const expectedState = {
      ...initialState,
      loginRequest: true,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle LOGIN_SUCCESS', () => {
    const userData = {
      id: '12345',
      name: 'nikita',
    };

    const action: any = {
      type: LOGIN_SUCCESS,
      data: userData,
    };

    const expectedState = {
      ...initialState,
      loginRequest: false,
      loginFailed: false,
      user: userData,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle LOGIN_FAILED', () => {
    const action: any = {
      type: LOGIN_FAILED,
    };

    const expectedState = {
      ...initialState,
      user: null,
      loginRequest: false,
      loginFailed: true,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FORGOT_PASSWORD_REQUEST', () => {
    const action: any = {
      type: FORGOT_PASSWORD_REQUEST,
    };

    const expectedState = {
      ...initialState,
      forgotPasswordRequest: true,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });


  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    const action: any = {
      type: FORGOT_PASSWORD_SUCCESS,
    };

    const expectedState = {
      ...initialState,
      isPasswordChanged: true,
      forgotPasswordRequest: false,
      forgotPasswordFailed: false,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });


  it('should handle FORGOT_PASSWORD_FAILED', () => {
    const action: any = {
      type: FORGOT_PASSWORD_FAILED,
    };

    const expectedState = {
      ...initialState,
      forgotPasswordRequest: false,
      forgotPasswordFailed: true,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle LOGOUT_REQUEST', () => {
    const action: any = {
      type: LOGOUT_REQUEST,
    };

    const expectedState = {
      ...initialState,
      logoutRequest: true,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

 
  it('should handle LOGOUT_SUCCESS', () => {
    const action: any = {
      type: LOGOUT_SUCCESS,
    };

    const expectedState = {
      ...initialState,
      logoutRequest: false,
      logoutFailed: false,
      user: null,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });


  it('should handle LOGOUT_FAILED', () => {
    const action: any = {
      type: LOGOUT_FAILED,
    };

    const expectedState = {
      ...initialState,
      logoutRequest: false,
      logoutFailed: true,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle REGISTER_REQUEST', () => {
    const action: any = {
      type: REGISTER_REQUEST,
    };

    const expectedState = {
      ...initialState,
      registerRequest: true,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });


  it('should handle REGISTER_SUCCESS', () => {
    const mockUserData = {
      id: '123',
      email: "test@yandex.ru",
    };

    const action: any = {
      type: REGISTER_SUCCESS,
      data: mockUserData,
    };

    const expectedState = {
      ...initialState,
      registerRequest: false,
      registerFailed: false,
      user: mockUserData,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });


  it('should handle REGISTER_FAILED', () => {
    const action: any = {
      type: REGISTER_FAILED,
    };

    const expectedState = {
      ...initialState,
      registerRequest: false,
      registerFailed: true,
      user: null,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle RESET_PASSWORD_REQUEST', () => {
    const action: any = {
      type: RESET_PASSWORD_REQUEST,
    };

    const expectedState = {
      ...initialState,
      resetPasswordRequest: true,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });


  it('should handle RESET_PASSWORD_SUCCESS', () => {
    const action: any = {
      type: RESET_PASSWORD_SUCCESS,
    };

    const expectedState = {
      ...initialState,
      resetPasswordRequest: false,
      resetPasswordFailed: false,
      isPasswordChanged: false,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle RESET_PASSWORD_FAILED', () => {
    const action: any = {
      type: RESET_PASSWORD_FAILED,
    };

    const expectedState = {
      ...initialState,
      resetPasswordRequest: false,
      resetPasswordFailed: true,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle UPDATE_USER_REQUEST', () => {
    const action: any = {
      type: UPDATE_USER_REQUEST,
    };

    const expectedState = {
      ...initialState,
      updateUserRequest: true,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_USER_SUCCESS', () => {
    const mockUserData = {
      id: '123',
      name: 'nikita',
      email: 'test@yandex.ru',
    };

    const action: any = {
      type: UPDATE_USER_SUCCESS,
      data: mockUserData,
    };

    const expectedState = {
      ...initialState,
      updateUserRequest: false,
      updateUserFailed: false,
      user: mockUserData,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_USER_FAILED', () => {
    const action: any = {
      type: UPDATE_USER_FAILED,
    };

    const expectedState = {
      ...initialState,
      updateUserRequest: false,
      updateUserFailed: true,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });




  
  });