import React, { ReactElement, useEffect } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../oreder-details/order-details";
import MainIngredient from "../main/main";
import { useDrop } from "react-dnd";
import { getIngredients } from "../../services/actions/ingredients";
import { getOrder } from "../../services/actions/order";
import { addIngredient } from "../../services/actions/burger-constructor";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { useSelector, useDispatch } from "../../services/hooks";
import { TIngredient, TIngredientConstructor } from "../../utils/prop-types";
import { TIngredientsMap, TIngredients } from "../../utils/prop-types";
import { Ingredient } from "../../pages/ingredients/ingredient";

type TDropItem = {
  element: TIngredientConstructor;
  _id: string;
  bun: TIngredient;
  fillings: TIngredientConstructor[];
  uuid: string;
};

export function BurgerConstructor(): ReactElement {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const getBuns = (store: any) => store.burgerConstructor.buns;
  const buns: any = useSelector(getBuns);

  const getFillings = (store: any) => store.burgerConstructor.fillings;
  const fillings: any = useSelector(getFillings);

  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const getUserData = (store: any) => store.user.user;
  const user = useSelector(getUserData);

  const openModal = () => {
    createOrder();
    setModalIsOpen(true);
  };

  const createOrder = () => {
    const ingredientsId = fillings?.map((item: TIngredientConstructor) => item._id);
    if (!user) {
      navigate("/login");
      return;
    }
    if (buns) {
      ingredientsId?.push(buns._id);
    }
    if (ingredientsId?.length > 0) {
      dispatch(getOrder(ingredientsId));
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(item: TDropItem) {
      if (buns && buns._id === item._id) return;
      const ingredient = Object.assign({}, item);
      ingredient.uuid = uuidv4();
      dispatch(addIngredient(ingredient));
    },
  });

  const totalPrice = React.useMemo(
    () =>
      fillings.reduce(
        (total: number, item: TIngredientConstructor) => (total += item.price),
        buns ? buns.price * 2 : 0
      ),
    [buns, fillings]
  );

  return (
    <section className={styles.constructor_box} ref={dropRef}>
      <div className={`mt-15 ${styles.constructor_container}`}>
        <div className={styles.info}>
          {buns ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${buns.name} (верх)`}
              price={buns.price}
              thumbnail={buns.image}
              extraClass={`ml-4 mb-4`}
            />
          ) : null}
        </div>

        <ul className={`custom-scroll ${styles.constructor_list}`}>
          {fillings.map((item: TIngredientConstructor, index: number) => {
            return <MainIngredient key={item.uuid} index={index} item={item} />;
          })}
        </ul>

        <div className={styles.info}>
          {buns ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${buns.name} (низ)`}
              price={buns.price}
              thumbnail={buns.image}
              extraClass={`ml-4 mt-4`}
            />
          ) : null}
        </div>
      </div>
      <div className={`mt-10 mr-4 ${styles.total}`}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">
            {totalPrice ? totalPrice : 0}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={openModal}
        >
          Оформить заказ
        </Button>
      </div>
      {modalIsOpen && (
        <Modal handleClose={closeModal} header={""}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
