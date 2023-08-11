export const BASE_URL = 'https://norma.nomoreparties.space/api'

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

function checkSuccess(res) {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
}

export const request = (endpoint, options) => {
  return fetch(`${BASE_URL}/${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export const getIngredientsServer = () => {
  return fetch(`${BASE_URL}/ingredients`)
      .then(checkResponse)
}
  
  export const getOrderServer = (ingredients) => {
    return fetch((`${BASE_URL}/orders`), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ingredients: ingredients
          })
        })
        .then(checkResponse)
  }

  export const loginRequest = (data) => {
    return fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
        .then(checkResponse);
  };
  
  export const logoutRequest = (data) => {
    return fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: data
      })
    })
        .then(checkResponse);
  };
  
  export const registerRequest = (data) => {
    return fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        name: data.name
      })
    })
        .then(checkResponse);
  };
  
  export const forgotPasswordRequest = (data) => {
    return fetch(`${BASE_URL}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email
      })
    })
        .then(checkResponse);
  };
  
  export const resetPasswordRequest = (data) => {
    return fetch(`${BASE_URL}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: data.password,
        token: data.token
      })
    })
        .then(checkResponse);
  };

  export const refreshToken = () => {
    return fetch(`${BASE_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      }),
    }).then(checkResponse);
  };
  
  export const fetchWithRefresh =  (url, options) => {
    try {
      const res =  fetch(url, options);
      return  checkResponse(res);
    } catch (err) {
      if (err.message === 'jwt expired') {
        const refreshData =  refreshToken(); 
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem('refreshToken', refreshData.refreshToken);
        localStorage.setItem('accessToken', refreshData.accessToken);
        options.headers.authorization = refreshData.accessToken;
        const res =  fetch(url, options); 
        return  checkResponse(res);
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
        Authorization: localStorage.getItem('accessToken')
      }
    })
  };
  
  export const updateUserProfileRequest = (data) => {
    return fetchWithRefresh(`${BASE_URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password
      })
    })
  };
  