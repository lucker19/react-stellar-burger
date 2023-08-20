import { useSelector, useDispatch } from "../../services/hooks";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { RootState } from "../../services/reducers";

type TProtected = {
  component: any;
  onlyUnAuth: any;
};

const Protected = ({ onlyUnAuth = false, component }: TProtected) => {
  const getAuthorized = (store: RootState) => store.user.isAuthChecked;
  const isAuthChecked = useSelector(getAuthorized);
  const location = useLocation();

  const getUserData = (store: RootState) => store.user.user;
  const user = useSelector(getUserData);

  if (!isAuthChecked) {
    return <div>Загрузка...</div>;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: any) => (
  <Protected onlyUnAuth={true} component={component} />
);

Protected.propTypes = {
  onlyUnAuth: PropTypes.bool,
  component: PropTypes.element.isRequired,
};
