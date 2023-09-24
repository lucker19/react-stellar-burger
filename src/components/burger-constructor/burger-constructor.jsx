import React from "react";
import styles from "./burger-constructor.module.css";
import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropType} from "../../utils/prop-types";
import PropTypes from "prop-types";
import Card from '../card/card';
import Modal from "../modal/modal";
import OrderDetails from "../oreder-details/order-details";


const calcOrder = (items) => {
    let total = 0;
    items.forEach((ingredient) => {
      total += ingredient.price;
    })
    return total;
}


const BurgerConstructor = (props) => {

    const ingredients = props.data;
    const bread = ingredients.find(item => item.type === 'bun');

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <section className={styles.constructor_box}>
            <div className={`mt-15 ${styles.constructor_container}`}>

                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bread.name} (верх)`}
                    price={bread.price}
                    thumbnail={bread.image}
                    extraClass={`ml-4`}
                />


              <ul className={`custom-scroll ${styles.constructor_list}`}>
                {ingredients.map((item) => {
                if (item.type !== 'bun') {
                  return (
                      <li className={styles.constructor_card} key={item._id}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                        />
                      </li>
                  )}}
                )}
              </ul>

                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bread.name} (низ)`}
                    price={bread.price}
                    thumbnail={bread.image}
                    extraClass={`ml-4`}
                />

            </div>
          <div className={`mt-10 mr-4 ${styles.total}`}>
            <div className={styles.price}>
              <p className="text text_type_digits-medium">{calcOrder(ingredients)}</p>
              <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="large" onClick={() => setIsOpen(true)}>
              Оформить заказ
            </Button>
          </div>
          <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
            <OrderDetails></OrderDetails>
          </Modal>
        </section>

    )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired
};

export default BurgerConstructor;

