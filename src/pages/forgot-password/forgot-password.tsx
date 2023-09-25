import styles from "./forgot-password.module.css";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "../../services/hooks";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { forgotPassword } from "../../services/actions/user";
import { ChangeEvent } from "react";
import { RootState } from "../../services/reducers";

export function ForgotPasswordPage(): ReactElement {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "", 
    password: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isPasswordChanged = useSelector(
    (store: any) => store.user.isPasswordChanged
  );

  useEffect(() => {
    if (isPasswordChanged) {
      navigate("/reset-password");
    }
  }, [navigate, isPasswordChanged]);

  const onConfirmEmail = useCallback(
    (e) => {
      e.preventDefault();
      if (form.email !== "") {
        dispatch(forgotPassword(form));
      }
    },
    [form, dispatch]
  );

  return (
    <div className={`mt-30 ${styles.forgot_password}`}>
      <h2 className={`text text_type_main-medium ${styles.heading}`}>
        Восстановление пароля
      </h2>
      <form className={`mt-6 ${styles.form}`} onSubmit={onConfirmEmail}>
        <EmailInput
          placeholder={"Укажите e-mail"}
          onChange={onChange}
          value={form.email}
          name={"email"}
          isIcon={false}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <p className={`pt-20 text text_type_main-default`}>
        Вспомнили пароль?&#160;
        <Link to={"/login"} className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
}
