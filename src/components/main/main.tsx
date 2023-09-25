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

type TDragItem = {
  name: string;
  type: string;
  index: number
};
const MainIngredient: FC<TMainProps> = ({ item, index }) => {

  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const onDelete = (item: TIngredient) => {
    dispatch(deleteIngredient(item));
  };

  const [, dragRef] = useDrag({
    type: 'filling',
    item: { index }
  });

  const sortIngredientsOrder = useCallback((fromIndex, toIndex) => {
    dispatch(sortIngredients({ fromIndex, toIndex }))
  }, []);

  const [, dropRef] = useDrop({
    accept: 'filling',
    hover(item: TDragItem, monitor) {
      if (!ref.current) return;
      const fromIndex = item.index;
      const toIndex = index;
      if (fromIndex === toIndex) return;
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (fromIndex < toIndex && hoverClientY < hoverMiddleY) return;
      if (fromIndex > toIndex && hoverClientY > hoverMiddleY) return;
      sortIngredientsOrder(fromIndex, toIndex);
      item.index = toIndex;
    }
  });

  dragRef(dropRef(ref));

  return (
      <li className={styles.content} ref={ref}>
        <DragIcon type="primary" />
        <ConstructorElement
            text={item.name}
            price={item.price}
            thumbnail={item.image}
            handleClose={() => onDelete(item)}
        />
      </li>
  )
};

export default MainIngredient;