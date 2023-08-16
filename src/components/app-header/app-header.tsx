import React from "react";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation } from "react-router-dom";

function AppHeader() {
  const { pathname } = useLocation();
  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <NavLink
          to={{ pathname: `/` }}
          className={`pt-4 pr-5 pb-4 pl-5 ${styles.menu_item}`}
        >
          <BurgerIcon type={pathname === "/" ? "primary" : "secondary"} />
          <p
            className={`text text_type_main-small ${
              pathname === "/" ? "text_color_primary" : "text_color_inactive"
            }`}
          >
            Конструктор
          </p>
        </NavLink>

        <NavLink
          to={{ pathname: `/orders` }}
          className={`pt-4 pr-5 pb-4 pl-5 ${styles.menu_item}`}
        >
          <ListIcon type={pathname === "/orders" ? "primary" : "secondary"} />
          <p
            className={`text text_type_main-small ${
              pathname === "/orders"
                ? "text_color_primary"
                : "text_color_inactive"
            }`}
          >
            Лента заказов
          </p>
        </NavLink>
      </nav>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div>
        <NavLink
          to={{ pathname: `/profile` }}
          className={`pt-4 pr-5 pb-4 pl-4 ${styles.menu_item}`}
        >
          <ProfileIcon
            type={pathname === "/profile" ? "primary" : "secondary"}
          />
          <p
            className={`text text_type_main-small ${
              pathname === "/profile"
                ? "text_color_primary"
                : "text_color_inactive"
            }`}
          >
            Личный кабинет
          </p>
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
