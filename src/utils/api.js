const BASE_URL = 'https://norma.nomoreparties.space/api'

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