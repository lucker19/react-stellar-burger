import styles from "./profile.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "../../services/hooks";
import { logOut, updateUser } from "../../services/actions/user";
import { ReactElement, ChangeEvent, SyntheticEvent } from "react";
import { useLocation } from "react-router-dom";
import ProfileNav from "../../components/profile-navigation/profile-nav";
import { Outlet } from "react-router-dom";
import { RootState } from "../../services/reducers";

export default function ProfilePage(): ReactElement {
  const dispatch = useDispatch();
  const getUser = (store: RootState) => store.user.user;
  const user = useSelector(getUser);
  const [form, setForm] = useState({
    email: user.email,
    password: "",
    name: user.name,
  });
  const { pathname } = useLocation();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onResetUserData = (e: SyntheticEvent) => {
    e.preventDefault();
    setForm({
      name: user.name,
      email: user.email,
      password: "",
    });
  };

  const onLogout = () => {
    dispatch(logOut(localStorage.getItem("refreshToken")));
  };

  return (
    <div className={styles.container}>
      <div className={`mt-30 ${styles.profile}`}>
        <div className={styles.links}>
          <NavLink
            to="/profile"
            className={
              pathname === "/profile"
                ? `${styles.link} ${styles.current_link}`
                : `${styles.link}`
            }
          >
            <p className="text text_type_main-medium">Профиль</p>
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={
              pathname === "/profile/orders"
                ? `${styles.link} ${styles.current_link}`
                : `${styles.link}`
            }
          >
            <p className="text text_type_main-medium">История заказов</p>
          </NavLink>
          <li className={styles.link} onClick={onLogout}>
            <p className="text text_type_main-medium">Выход</p>
          </li>
          {pathname === "/profile" ? (
            <p
              className={`pt-20 text text_type_main-default text_color_inactive ${styles.text}`}
            >
              В этом разделе вы можете изменить свои персональные данные
            </p>
          ) : pathname === "/profile/orders" ? (
            <p
              className={`pt-20 text text_type_main-default text_color_inactive ${styles.text}`}
            >
              В этом разделе вы можете просмотреть свою историю заказов
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
