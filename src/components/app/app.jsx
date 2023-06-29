import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function App() {
  return (
    
    <div className={styles.app}>
      <AppHeader />
        <main>
        { data.length > 0 &&
              <>
                <BurgerIngredients data={data} />
                
              </>
          }
        </main>
      	
 
    </div>
  );
}

export default App;
