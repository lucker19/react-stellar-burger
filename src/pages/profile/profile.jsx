import styles from "./profile.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { logOut, updateUser } from "../../services/actions/user";

export function ProfilePage() {
  const dispatch = useDispatch();
  const getUser = (store) => store.user.user;
  const user = useSelector(getUser);
  const [form, setForm] = useState({
    email: user.email,
    password: "",
    name: user.name,
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onResetUserData = (e) => {
    e.preventDefault();
    setForm({
      name: user.name,
      email: user.email,
      password: "",
    });
  };

  const onUpdateUser = (e) => {
    e.preventDefault();
    dispatch(updateUser(form));
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
            className={(current) =>
              current.isActive
                ? `${styles.link} ${styles.current_link}`
                : `${styles.link}`
            }
          >
            <p className="text text_type_main-medium">Профиль</p>
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={(current) =>
              current.isActive
                ? `${styles.link} ${styles.current_link}`
                : `${styles.link}`
            }
          >
            <p className="text text_type_main-medium">История заказов</p>
          </NavLink>
          <li className={styles.link} onClick={onLogout}>
            <p className="text text_type_main-medium">Выход</p>
          </li>
          <p
            className={`pt-20 text text_type_main-default text_color_inactive ${styles.text}`}
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <form className={styles.form} onSubmit={onUpdateUser}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            icon={"EditIcon"}
            value={form.name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
          <EmailInput
            placeholder={"Логин"}
            onChange={onChange}
            value={form.email}
            name="email"
            icon="EditIcon"
          />
          <Input
            type={"password"}
            placeholder={"Пароль"}
            onChange={onChange}
            icon={"EditIcon"}
            value={form.password}
            name="password"
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
          <div
            className={
              form.name === user.name &&
              form.email === user.email &&
              form.password === ""
                ? `${styles.buttons}`
                : `${styles.buttons_active} mt-6`
            }
          >
            <Button
              htmlType="reset"
              type="secondary"
              size="large"
              onClick={onResetUserData}
            >
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
