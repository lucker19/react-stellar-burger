import React from "react";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <a className={`pt-4 pr-5 pb-4 pl-5 ${styles.menu_item}`}>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-small">Конструктор</p>
        </a>
        <a className={`pt-4 pr-5 pb-4 pl-5 ${styles.menu_item}`}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-small text_color_inactive">
            Лента заказов
          </p>
        </a>
      </nav>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div>
        <a className={`pt-4 pr-5 pb-4 pl-4 ${styles.menu_item}`}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-small text_color_inactive">
            Личный кабинет
          </p>
        </a>
      </div>
    </header>
  );
}

export default AppHeader;
