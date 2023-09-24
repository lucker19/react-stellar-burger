import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import React from "react";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredientsServer } from "../../utils/api";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from "../../services/hooks";
import { getIngredients } from "../../services/actions/ingredients";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router";
import { useNavigate } from "react-router";
import { LoginPage } from "../../pages/login/login";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { RegisterPage } from "../../pages/register/register";
import { checkUserAuth } from "../../services/actions/user";
import HomePage from "../../pages/home/home";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredients-detals/ingredients-details";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import ProfilePage from "../../pages/profile/profile";
import { Ingredient } from "../../pages/ingredients/ingredient";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import { ReactElement } from "react";
import FeedPage from "../../pages/feed/feed";
import FeedOrderPage from "../../pages/feed-order/feed-order";
import ProfileNav from "../profile-navigation/profile-nav";
import { ProfileOrders } from "../profile-orders/profile-orders";

function App(): ReactElement {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path={`/`} element={<HomePage />} />
          <Route path={"/feed"} element={<FeedPage />} />
          <Route path={"/feed/:id"} element={<FeedOrderPage />} />
          <Route
            path={`/login`}
            element={<OnlyUnAuth component={<LoginPage />} />}
          />

          <Route
            path={"/register"}
            element={<OnlyUnAuth component={<RegisterPage />} />}
          />
          <Route
            path={"/forgot-password"}
            element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
          />

          <Route
            path={"/reset-password"}
            element={<OnlyUnAuth component={<ResetPasswordPage />} />}
          />
          <Route
            path={"/profile"}
            element={<OnlyAuth component={<ProfilePage />} />}
          >
            <Route index element={<OnlyAuth component={<ProfileNav />} />} />
            <Route
              path={"/profile/orders"}
              element={<OnlyAuth component={<ProfileOrders />} />}
            />
          </Route>
          <Route path={"/ingredients/:ingredientId"} element={<Ingredient />} />
          <Route
            path={"/ingredients/:ingredientId"}
            element={<IngredientDetails />}
          />
        </Routes>
        {background && (
          <Routes>
            <Route
              path="/ingredients/:ingredientId"
              element={
                <Modal
                  handleClose={handleModalClose}
                  header={"Детали ингредиента"}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path="/feed/:id"
              element={
                <Modal handleClose={handleModalClose}>
                  <FeedOrderPage isModal={true} />
                </Modal>
              }
            />
            <Route
              path="/profile/orders/:id"
              element={
                <Modal handleClose={handleModalClose}>
                  <FeedOrderPage isModal={true} />
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
    </DndProvider>
    
  );
}

export default App;
