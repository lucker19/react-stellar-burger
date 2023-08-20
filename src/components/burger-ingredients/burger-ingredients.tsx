import React, { useEffect } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Card from "../card/card";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredients-detals/ingredients-details";
import { useSelector, useDispatch } from "../../services/hooks";
import { useInView } from "react-intersection-observer";
import { getIngredients } from "../../services/actions/ingredients";
import {
  addIngredientsDetails,
  deleteIngredientsDetails,
} from "../../services/actions/ingredients-details";
import { FC } from "react";
import { TIngredient } from "../../utils/prop-types";
import { RootState } from "../../services/reducers";

const BurgerIngredients: FC = () => {
  const dispatch = useDispatch();

  const getBurgerIngredients = (store: RootState) =>
    store.ingredients.ingredients;
  const ingredients = useSelector(getBurgerIngredients);

  const getIngredientDetails = (store: RootState) =>
    store.ingredientDetails.ingredientDetails;
  const ingredientDetails = useSelector(getIngredientDetails);

  const bun = React.useMemo(
    () => ingredients.filter((item: TIngredient) => item.type === "bun"),
    [ingredients]
  );
  const sauces = React.useMemo(
    () => ingredients.filter((item: TIngredient) => item.type === "sauce"),
    [ingredients]
  );
  const main = React.useMemo(
    () => ingredients.filter((item: TIngredient) => item.type === "main"),
    [ingredients]
  );

  const [current, setCurrent] = React.useState("bun");

  const [bunRef, bunInView, bunTab] = useInView({ threshold: 0 });
  const [saucesRef, saucesInView, saucesTab] = useInView({ threshold: 0 });
  const [mainRef, mainInView, mainTab] = useInView({ threshold: 0 });

  useEffect(() => {
    bunInView && setCurrent("bun");
    saucesInView && setCurrent("sauce");
    mainInView && setCurrent("main");
  }, [bunInView, saucesInView, mainInView]);

  const switchTab = (tab: string, entry: any) => {
    setCurrent(tab);
    entry.target.scrollIntoView({ behavior: "smooth" });
  };

  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const openIngredientDetails = (card: object) => {
    dispatch(addIngredientsDetails(card));
    setModalIsOpen(true);
  };

  const closeIngredientsDetail = () => {
    dispatch(deleteIngredientsDetails());
  };

  return (
    <section className={styles.ingredients_box}>
      <h1 className="text text_type_main-large">Собери бургер</h1>
      <div className={`mt-5 mb-10`} style={{ display: "flex" }}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => switchTab("bun", bunTab)}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => switchTab("sauce", saucesTab)}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => switchTab("main", mainTab)}
        >
          Начинки
        </Tab>
      </div>

      <ul className={`${styles.ingredients} custom-scroll`}>
        <h3 className={`mb-6 text text_type_main-medium`} ref={bunRef}>
          Булки
        </h3>
        <ul className={`pr-2 pl-4 ${styles.card}`}>
          {bun.map((item: TIngredient) => (
            <Card card={item} key={item._id} />
          ))}
        </ul>
        <h3 className={`mt-10 mb-6 text text_type_main-medium`} ref={saucesRef}>
          Соусы
        </h3>
        <ul className={`pr-2 pl-4 ${styles.card}`}>
          {sauces.map((item: TIngredient) => (
            <Card card={item} key={item._id} />
          ))}
        </ul>
        <h3 className={`mt-10 mb-6 text text_type_main-medium`} ref={mainRef}>
          Начинки
        </h3>
        <ul className={`pr-2 pl-4 ${styles.card}`}>
          {main.map((item: TIngredient) => (
            <Card card={item} key={item._id} />
          ))}
        </ul>
      </ul>
    </section>
  );
};

export default BurgerIngredients;
