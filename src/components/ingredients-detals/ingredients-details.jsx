import React from "react";
import styles from "./ingredients-details.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function IngredientDetails() {
  const location = useLocation();
  const background = location.state && location.state.background;

  const getIngredientsList = (store) => store.ingredients.ingredients;
  const ingredientsList = useSelector(getIngredientsList);
  const { ingredientId } = useParams();
  const ingredient = ingredientsList.find((item) => item._id === ingredientId);

  return (
    <div
      className={background ? styles.modal_container : styles.main_container}
    >
      <img className={styles.image} src={ingredient.image} alt="Ингредиент" />
      <p className={"mt-4 text text_type_main-medium"}>{ingredient.name}</p>
      <ul className={`mt-8 ${styles.list}`}>
        <li className={styles.list_card}>
          <p className={"text text_type_main-default text_color_inactive"}>
            Калории,ккал
          </p>
          <p className={"text text_type_main-default text_color_inactive"}>
            {ingredient.calories}
          </p>
        </li>
        <li className={styles.list_card}>
          <p className={"text text_type_main-default text_color_inactive"}>
            Белки, г
          </p>
          <p className={"text text_type_main-default text_color_inactive"}>
            {ingredient.proteins}
          </p>
        </li>
        <li className={styles.list_card}>
          <p className={"text text_type_main-default text_color_inactive"}>
            Жиры, г
          </p>
          <p className={"text text_type_main-default text_color_inactive"}>
            {ingredient.fat}
          </p>
        </li>
        <li className={styles.list_card}>
          <p className={"text text_type_main-default text_color_inactive"}>
            Углеводы, г
          </p>
          <p className={"text text_type_main-default text_color_inactive"}>
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;

IngredientDetails.propTypes = {
  card: ingredientPropType,
};
