import { useSelector, useDispatch } from "../../services/hooks";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { RootState } from "../../services/reducers";

type TComponent = {
  component: JSX.Element
};

type TProtected = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
};

const Protected = ({ onlyUnAuth = false, component }: TProtected) => {

  const isAuthChecked = useSelector((store: any) => store.user.isAuthChecked);
  const location = useLocation();

  const user = useSelector((store: any) => store.user.name);

  if (!isAuthChecked) {
    return <div>Загрузка...</div>
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
export const OnlyUnAuth = ({ component }: TComponent) => (
    <Protected onlyUnAuth={true} component={component} />
);