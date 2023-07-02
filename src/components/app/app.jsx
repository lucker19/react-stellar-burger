import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import React from "react";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

export const getIngredients = () => {
  return fetch(apiUrl)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
};

function App() {
  const [ingredients, setIngredients] = React.useState([] );

  const data = ingredients;
  React.useEffect(() => {
    getIngredients()
        .then(res => setIngredients(res.data))
        .catch(err => {
          console.log(err)})
  }, []);

  return (
    
    <div className={styles.app}>
      <AppHeader />
        <main className={`mt-10 mb-10 ${styles.main}`}>
        { data.length > 0 &&
              <>
                <BurgerIngredients data={data} />
                <BurgerConstructor data={data} />
              </>
          }
        </main>
      	
 
    </div>
  );
}

export default App;
