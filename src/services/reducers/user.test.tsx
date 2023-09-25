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
        const action: any = {
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
      const sampleUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
      };
  
      const action: any = {
        type: SET_USER,
        payload: {
          user: sampleUser,
        },
      };
  
      const expectedState = {
        ...initialState,
        name: sampleUser.name,
        email: sampleUser.email,
        isAuthChecked: true,
      };
  
      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

      it('should handle GET_USER_FAILED', () => {
        const action: any = {
          type: GET_USER_FAILED,
        };
    
        const expectedState = {
          ...initialState,
          name: '',
          email: '',
          getUserFailed: true,
          isAuthChecked: true,
        };
    
        expect(userReducer(initialState, action)).toEqual(expectedState);
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
    const sampleUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };

    const action: any = {
      type: LOGIN_SUCCESS,
      payload: {
        user: sampleUser,
      },
    };

    const expectedState = {
      ...initialState,
      loginRequest: false,
      loginFailed: false,
      name: sampleUser.name,
      email: sampleUser.email,
      isAuthChecked: true,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle LOGIN_FAILED', () => {
    const action: any = {
      type: LOGIN_FAILED,
    };

    const expectedState = {
      ...initialState,
      loginRequest: false,
      loginFailed: true,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);

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
      name: initialState.name,
      email: initialState.email,
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
      user: {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
      },
    };

    const action: any = {
      type: REGISTER_SUCCESS,
      payload: mockUserData,
    };

    const expectedState = {
      ...initialState,
      registerRequest: false,
      registerFailed: false,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      isAuthChecked: true,
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
      name: initialState.name,
      email: initialState.email,
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
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
    };

    const action: any = {
      type: UPDATE_USER_SUCCESS,
      payload: mockUserData,
    };

    const expectedState = {
      ...initialState,
      updateUserRequest: false,
      updateUserFailed: false,
      name: 'John Doe',
      email: 'john.doe@example.com',
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