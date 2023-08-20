import styles from "./order-card.module.css";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, To, useLocation } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import {
  TIngredient,
  TIngredients,
  TOrder,
  getStatus,
  getTime,
} from "../../utils/prop-types";
import { RootState } from "../../services/reducers";

type TorderCardProps = {
  number?: number;
  createdAt?: string;
  name?: string;
  _id?: string;
  status?: string;
  order: TOrder;
};

const OrderCard = (props: TorderCardProps) => {
  const { pathname } = useLocation();
  const location = useLocation();
  const { number, createdAt, name, ingredients, _id, status } = props.order;
  const getIngredientsList = (store: RootState) =>
    store.ingredients.ingredients;
  const ingredientsList = useSelector(getIngredientsList);
  const images: any[] = [];

  const totalPrice =
    ingredients &&
    ingredientsList &&
    ingredients.reduce((total, id) => {
      ingredientsList &&
        ingredientsList.forEach((item: TIngredient) => {
          if (item._id === id) {
            total += item.price;
          }
        });
      return total;
    }, 0);

  ingredientsList &&
    ingredients &&
    ingredientsList.forEach((ingredient: TIngredient) => {
      ingredients.forEach((item) => {
        if (item === ingredient._id) {
          images.push({
            image: ingredient.image,
            name: ingredient.name,
          });
        }
      });
    });

  const checkCardCount = () => {
    if (images.length > 5) {
      return images.length - 5;
    }
    return null;
  };

  return (
    <li
      className={pathname === "/feed" ? styles.card_feed : styles.card_orders}
    >
      <Link
        key={_id}
        to={`${pathname}/${number}`}
        state={{ background: location }}
        className={
          pathname === "/feed"
            ? `${styles.link_feed} pt-6 pr-6 pb-6 pl-6 mr-2`
            : `${styles.link_orders} pt-6 pr-6 pb-6 pl-6 mr-2`
        }
      >
        <div className={styles.header}>
          <p className={`text text_type_digits-default pb-4 ${styles.number}`}>
            #{number}
          </p>
          <div className={`text text_type_digits-default ${styles.date} `}>
            <FormattedDate
              className="text text_type_main-default text_color_inactive"
              date={new Date(createdAt)}
            />
            <p className="text text_type_main-default text_color_inactive">
              {getTime(createdAt)}
            </p>
          </div>
        </div>

        <h2 className={`text text_type_main-medium ${styles.name}`}>{name}</h2>
        <p
          className={
            status === "done"
              ? `${styles.status_done} text text_type_main-default`
              : `${styles.status_pending} text text_type_main-default`
          }
        >
          {getStatus(status)}
        </p>

        <div className={`${styles.info} pt-4`}>
          <ul className={`${styles.info_ingredients} ml-6`}>
            {images.slice(0, 5).map((item, i) => (
              <li key={i} className={styles.image_background}>
                <div className={styles.image_container}>
                  <img
                    className={styles.image}
                    src={item.image}
                    alt={item.name}
                  />
                </div>
              </li>
            ))}
            {images.length > 5 ? (
              <li className={styles.image_background}>
                <div className={styles.image_container}>
                  <img
                    className={styles.image}
                    src={images[5].image}
                    alt={images[5].name}
                  />
                </div>
              </li>
            ) : null}

            {checkCardCount() ? (
              <span
                className={`${styles.counter} text text_type_main-default`}
              >{`+${checkCardCount()}`}</span>
            ) : (
              ""
            )}
          </ul>

          <div className={`pl-10 ${styles.price} `}>
            <p className="text text_type_digits-default">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default OrderCard;
