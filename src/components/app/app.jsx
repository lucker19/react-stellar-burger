import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import React from "react";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredientsServer } from "../../utils/api";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function App() {


  return (
    <div className={styles.app}>
    <AppHeader />
      <main className={`mt-10 mb-10 ${styles.main}`}>
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
        </DndProvider>
      </main>
  </div>

);
}

export default App;
