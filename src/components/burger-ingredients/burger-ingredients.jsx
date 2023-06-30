import React from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Card from "../card/card";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredients-detals/ingredients-details";





const BurgerIngredients = (props) => {

  const ingredients = props.data;

  const bread = ingredients.filter(item => item.type === 'bun');
  const sauces = ingredients.filter(item => item.type === 'sauce');
  const fillings = ingredients.filter(item => item.type === 'main');

  const [current, setCurrent] = React.useState('bun');

  const [card, openCard] = React.useState(null);

    return (
          <section className={styles.ingredients_box}>
            <h1 className="text text_type_main-large">Собери бургер</h1>
            <div className={`mt-5 mb-10`} style={{ display: 'flex' }}>
              <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                Булки
              </Tab>
              <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                Соусы
              </Tab>
              <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                Начинки
              </Tab>
            </div>

            <ul className={`${styles.ingredients} custom-scroll`}>
              <h3 className={`mb-6 text text_type_main-medium`}>Булки</h3>
              <ul className={`pr-2 pl-4 ${styles.card}`}>
                {bread.map((item) => (
                    <Card card={item} key={item._id} onClick={openCard}/>
                ))}
              </ul>
              <h3 className={`mt-10 mb-6 text text_type_main-medium`}>Соусы</h3>
              <ul className={`pr-2 pl-4 ${styles.card}`}>
                {sauces.map((item) => (
                    <Card card={item} key={item._id} onClick={openCard}/>
                ))}
              </ul>
              <h3 className={`mt-10 mb-6 text text_type_main-medium`}>Начинки</h3>
              <ul className={`pr-2 pl-4 ${styles.card}`}>
                {fillings.map((item) => (
                    <Card card={item} key={item._id} onClick={openCard}/>
                ))}
              </ul>
            </ul>
            <Modal handleClose={() => openCard(null)} isOpen={card} header={"Детали ингредиента"}>
              <IngredientDetails card={card}></IngredientDetails>
            </Modal>
          </section>
    )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired
};

export default BurgerIngredients;