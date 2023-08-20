import styles from "./order-details.module.css";
import React, { FC } from "react";
import { useSelector, useDispatch } from "../../services/hooks";
import order_accepted from "../../images/order_accepted.svg";
import { RootState } from "../../services/reducers";

const OrderDetails: FC = () => {
  const getOrderNumber = (store: RootState) => store.order.order;
  const orderNumber = useSelector(getOrderNumber);
  return (
    <div className={styles.container}>
      <p className="text text_type_digits-large">{orderNumber}</p>
      <p className={"text text_type_main-medium mt-8"}>идентификатор заказа</p>
      <img className={styles.image} src={order_accepted} alt="Готово" />
      <p className="text text_type_main-small mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-small text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
