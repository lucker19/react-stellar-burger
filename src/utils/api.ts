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


export const loginRequest = (data: TForm) => request('/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: data.email,
    password: data.password
  })
});

export const logoutRequest = () => request('/auth/logout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    token: localStorage.getItem('refreshToken'),
  })
});

export const registerRequest = (data: TForm) => request('/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: data.email,
    password: data.password,
    name: data.name
  })
});

export const forgotPasswordRequest = (data: TForm) => request('/password-reset', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: data.email
  })
});

export const resetPasswordRequest = (data: TForm) => request('/password-reset/reset', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    password: data.password,
    token: data.token
  })
});

export const refreshToken = () => request('/auth/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify({
    token: localStorage.getItem('refreshToken')
  }),
});

export const fetchWithRefresh = async (url: string, options: TOptions) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      localStorage.setItem('accessToken', refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
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