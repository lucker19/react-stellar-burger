const apiIngredients = 'https://norma.nomoreparties.space/api/ingredients';
const apiOrder = 'https://norma.nomoreparties.space/api/orders';

export const getIngredientsServer = () => {
    return fetch(apiIngredients)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
  }
  
  export const getOrderServer = (ingredients) => {
    return fetch((apiOrder), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ingredients: ingredients
          })
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
  }