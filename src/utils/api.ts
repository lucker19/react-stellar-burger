import { TForm } from "./prop-types";
import { IUser, TIngredient, TIngredients, TOrder } from "./prop-types";
export const BASE_URL = "https://norma.nomoreparties.space/api";
export const wsUrl: string = "wss://norma.nomoreparties.space/orders/all";
export const userOrdersUrl: string = `wss://norma.nomoreparties.space/orders`;


interface SuccessResponse {
  success: true;
  data: TIngredient[];
  orders: TOrder[];
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
    password: string;
  };
}

interface ErrorResponse {
  success: false;
  data: {
    error: string;
  };
}

export const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res: SuccessResponse | ErrorResponse) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

type TAuthorization = HeadersInit & {
  authorization?: string | null;
};

export type TOptions = {
  method: string;
  headers: TAuthorization;
  body?: BodyInit | null | undefined;
};

export const request = (endpoint: string, options?: TOptions) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export const getIngredientsServer = () => {
  return fetch(`${BASE_URL}/ingredients`).then(checkResponse);
};


export const getOrderServer = (order: string | undefined) => request(`/orders/${order}`);

export const loginRequest = (data: IUser) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  }).then(checkResponse);
};


export const logoutRequest = (data: IUser) => {
  return fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: data,
    }),
  }).then(checkResponse);
};

export const registerRequest = (data: IUser) => {
  return fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name,
    }),
  }).then(checkResponse);
};

export const forgotPasswordRequest = (data: IUser) => {
  return fetch(`${BASE_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
    }),
  }).then(checkResponse);
};

export const resetPasswordRequest = (data: any) => {
  return fetch(`${BASE_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: data.password,
      token: data.token,
    }),
  }).then(checkResponse);
};

export const refreshToken = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};



export const fetchWithRefresh = async (url: string, options: TOptions) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUserRequest = () => {
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `${localStorage.getItem('accessToken')}`
    }
  })
};

export const updateUserProfileRequest = (data: TForm) => {
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password
    })
  })
};

export const getOrderNumberRequest = (ingredients: string[]) => {
  return fetchWithRefresh(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify({
      ingredients: ingredients
    }),
  })
};
