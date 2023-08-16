import styles from "./register.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import { registerUser } from "../../services/actions/user";

export function RegisterPage() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = useCallback(
    (evt) => {
      evt.preventDefault();
      if (form.email !== "" && form.password !== "" && form.name !== "") {
        dispatch(registerUser(form));
      }
    },
    [dispatch, form]
  );

  return (
    <div className={`mt-30 ${styles.register}`}>
      <h2 className={`text text_type_main-medium ${styles.heading}`}>
        Регистрация
      </h2>
      <form className={`mt-6 ${styles.form}`} onSubmit={register}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={form.name}
          name={"name"}
          size={"default"}
        />
        <EmailInput
          placeholder={"E-mail"}
          onChange={onChange}
          value={form.email}
          name={"email"}
        />
        <PasswordInput
          placeholder={"Пароль"}
          onChange={onChange}
          value={form.password}
          name={"password"}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <p className={`pt-20 text text_type_main-default`}>
        Уже зарегистрированы?&#160;
        <Link to={"/login"} className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
}
