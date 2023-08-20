import React, { FC, ReactElement, useCallback, useRef } from "react";
import styles from "../main/main.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useSelector, useDispatch } from "../../services/hooks";
import {
  deleteIngredient,
  sortIngredients,
} from "../../services/actions/burger-constructor";
import { TIngredient } from "../../utils/prop-types";

type TMainProps = {
  item: TIngredient;
  index: number;
};

const MainIngredient = ({ item, index }: TMainProps): ReactElement => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const onDelete = (item: TIngredient):void => {
    dispatch(deleteIngredient(item));
  };

  const [, dragRef] = useDrag({
    type: "filling",
    item: { index },
  });

  const sortIngredientsOrder = useCallback(
    (fromIndex, toIndex) => {
      dispatch(sortIngredients(fromIndex, toIndex));
    },
    [dispatch]
  );

  const [, dropRef] = useDrop({
    accept: "filling",
    hover(item: any, monitor) {
      if (!ref.current) return;
      const fromIndex = item.index;
      const toIndex = index;
      if (fromIndex === toIndex) return;
      const hoverBoundingRect: DOMRect =
        targetRef.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset: any = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (fromIndex < toIndex && hoverClientY < hoverMiddleY) return;
      if (fromIndex > toIndex && hoverClientY > hoverMiddleY) return;
      sortIngredientsOrder(fromIndex, toIndex);
      item.index = toIndex;
    },
  });

  const targetRef: any = dragRef(dropRef(ref));

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
  );
};

export default MainIngredient;
