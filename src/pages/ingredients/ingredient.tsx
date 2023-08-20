import { useSelector, useDispatch } from "../../services/hooks";
import { FC, ReactElement, useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredients";
import { useParams } from "react-router";
import IngredientDetails from "../../components/ingredients-detals/ingredients-details";
import styles from "./ingredient.module.css";
import { TIngredient } from "../../utils/prop-types";
import { RootState } from "../../services/reducers";

export const Ingredient: FC = () => {
  const dispatch = useDispatch();

  const getIngredientsList = (store: RootState) =>
    store.ingredients.ingredients;
  const ingredientsList = useSelector(getIngredientsList);
  const { ingredientId } = useParams();
  const ingredient = ingredientsList.find(
    (item: TIngredient) => item._id === ingredientId
  );

  if (!ingredient) {
    return null;
  }

  if (ingredient) {
    return (
      <div className={`pt-30 ${styles.ingredients}`}>
        <p className="text text_type_main-large">Детали ингредиента</p>
        <IngredientDetails {...ingredient} />
      </div>
    );
  }
  return null;
};