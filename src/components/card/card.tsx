import React, { useEffect, useState } from "react";
import styles from "./card.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "../../services/hooks";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { TIngredient } from "../../utils/prop-types";
import { FC } from "react";
import { RootState } from "../../services/reducers";

interface IIngredientInterface {
  card: TIngredient;
}

const Card: FC<IIngredientInterface> = ({ card }) => {
  const location = useLocation();
  const ingredientId = card["_id"];

  const getIngredients = (store: RootState) => store.burgerConstructor;
  const { buns, fillings } = useSelector(getIngredients);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (buns && card.type === "bun" && card._id === buns._id) {
      setCounter(2);
    } else {
      setCounter(
        fillings?.filter((item) => item._id === card._id).length
      );
    }
  }, [buns, fillings, card._id, card.type]);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: card,
  });

  return (
    <li className={styles.card} ref={dragRef}>
      <Link
        key={ingredientId}
        to={`/ingredients/${ingredientId}`}
        state={{ background: location }}
        className={styles.card}
        data-cy={`ingredient-${card.type}`}
      >
        {!!counter && (
          <Counter count={counter} size="default" extraClass={`m-1`} />
        )}
        <img className={styles.img} src={card.image} alt={card.name} />
        <div className={styles.price}>
          <p className={`text text_type_digits-default pb-1 pt-1`}>
            {card.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default pt-1`}>{card.name}</p>
      </Link>
    </li>
  );
};

export default Card;
