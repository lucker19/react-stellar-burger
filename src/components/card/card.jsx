import React, { useEffect, useState } from "react";
import styles from "./card.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

const Card = ({ card }) => {
  const location = useLocation();
  const ingredientId = card["_id"];

  const getIngredients = (store) => store.burgerConstructor;
  const { buns, fillings } = useSelector(getIngredients);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (buns && card.type === "bun" && card._id === buns._id) {
      setCounter(1);
    } else {
      setCounter(fillings.filter((item) => item._id === card._id).length);
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

Card.propTypes = {
  card: ingredientPropType.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;
