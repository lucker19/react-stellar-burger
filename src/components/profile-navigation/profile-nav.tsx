import styles from "./profile-nav.module.css";
import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector,useDispatch } from "../../services/hooks";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { updateUser } from "../../services/actions/user";
import { RootState } from "../../services/reducers";

const ProfileNav = () => {
  const dispatch = useDispatch();
  const getUser = (store: RootState) => store.user.user;
  const user = useSelector(getUser);
  const [form, setForm] = useState({
    email: user.email,
    password: "",
    name: user.name,
  });

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

  const onUpdateUser = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(form));
  };

  return (
    <section className={styles.container}>
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
        <Input
          placeholder={"Логин"}
          onChange={onChange}
          value={form.email}
          name="email"
          icon={"EditIcon"}
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
    </section>
  );
};

export default ProfileNav;
