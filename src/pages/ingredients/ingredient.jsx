import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredients";
import { useParams } from "react-router";
import IngredientDetails from "../../components/ingredients-detals/ingredients-details";
import styles from "./ingredient.module.css";

export const Ingredient = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const getIngredientsList = (store) => store.ingredients.ingredients;
  const ingredientsList = useSelector(getIngredientsList);
  const { ingredientId } = useParams();
  const ingredient = ingredientsList.find((item) => item._id === ingredientId);

  if (ingredient) {
    return (
      <div className={`pt-30 ${styles.ingredients}`}>
        <p className="text text_type_main-large">Детали ингредиента</p>
        <IngredientDetails item={ingredient} />
      </div>
    );
  }
  return null;
};
