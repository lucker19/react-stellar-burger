import React, { useCallback, useRef } from "react";
import styles from "../main/main.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { deleteIngredient, sortIngredients } from "../services/actions/burger-constructor";


const MainIngredient = ({ item, index }) => {

  const dispatch = useDispatch();
  const ref = useRef(null);

  const onDelete = (item) => {
    dispatch(deleteIngredient(item));
  };

  const [, dragRef] = useDrag({
    type: 'filling',
    item: { index }
  });

  const sortIngredientsOrder = useCallback((fromIndex, toIndex) => {
    dispatch(sortIngredients(fromIndex, toIndex))
  }, [dispatch]);

  const [, dropRef] = useDrop({
    accept: 'filling',
    hover(item, monitor) {
      if (!ref.current) return;
      const fromIndex = item.index;
      const toIndex = index;
      if (fromIndex === toIndex) return;
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (fromIndex < toIndex && hoverClientY < hoverMiddleY) return;
      if (fromIndex > toIndex && hoverClientY > hoverMiddleY) return;
      sortIngredientsOrder(fromIndex, toIndex);
      item.index = toIndex;
    }
  });

  const targetRef = dragRef(dropRef(ref));

  return (
      <li className={styles.content} ref={targetRef}>
        <DragIcon type="primary" />
        <ConstructorElement
            text={item.name}
            price={item.price}
            thumbnail={item.image}
            handleClose={() => onDelete(item)}
        />
      </li>
  )
}

MainIngredient.propTypes = {
  index: PropTypes.number.isRequired,
  item: ingredientPropType.isRequired
};

export default MainIngredient;