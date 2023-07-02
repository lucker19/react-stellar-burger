import React from "react";
import styles from './ingredients-details.module.css'
import {ingredientPropType} from "../../utils/prop-types";

function IngredientDetails( { card } ) {
  return (
      <div className={styles.container}>
        <img className={styles.image} src={card.image} alt="Ингредиент"/>
        <p className={'mt-4 text text_type_main-medium'}>{card.name}</p>
        <ul className={`mt-8 ${styles.list}`}>
          <li className={styles.list_card}>
            <p className={'text text_type_main-default text_color_inactive'}>Калории,ккал</p>
            <p className={'text text_type_main-default text_color_inactive'}>{card.calories}</p>
          </li>
          <li className={styles.list_card}>
            <p className={'text text_type_main-default text_color_inactive'}>Белки, г</p>
            <p className={'text text_type_main-default text_color_inactive'}>{card.proteins}</p>
          </li>
          <li className={styles.list_card}>
            <p className={'text text_type_main-default text_color_inactive'}>Жиры, г</p>
            <p className={'text text_type_main-default text_color_inactive'}>{card.fat}</p>
          </li>
          <li className={styles.list_card}>
            <p className={'text text_type_main-default text_color_inactive'}>Углеводы, г</p>
            <p className={'text text_type_main-default text_color_inactive'}>{card.carbohydrates}</p>
          </li>
        </ul>
      </div>
  )
}

export default IngredientDetails;

IngredientDetails.propTypes = {
  card: ingredientPropType
};