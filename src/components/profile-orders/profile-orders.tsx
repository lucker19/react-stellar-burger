import styles from './profile-orders.module.css';
import { useSelector,useDispatch } from '../../services/hooks';
import { useEffect } from "react";
import { wsProfileOrdersConnect,wsProfileOrdersDisconnect } from '../../services/actions/profile-orders';
import { wsOrderConnect,wsOrderDisconnect } from '../../services/actions/orders-feed';
import OrderCard from "../order-card/order-card";
import { wsUrl,userOrdersUrl } from '../../utils/api';
import { RootState } from '../../services/reducers';
import { TIngredient, TOrder } from '../../utils/prop-types';

export const ProfileOrders = () => {

    const dispatch = useDispatch();
    const { orders } = useSelector((state:any) => state.feedOrders.orders);
  
    useEffect(() => {
      dispatch(wsProfileOrdersConnect(userOrdersUrl));
      dispatch(wsOrderConnect(wsUrl))
      return () => {
        dispatch(wsProfileOrdersDisconnect());
        dispatch(wsOrderDisconnect())
      }
    }, [])
  
    return (
        <ul className={`${styles.container} custom-scroll`}>
          { orders && orders.map((item:TOrder) => <OrderCard key={item._id} order={item} />) }
        </ul>
    )
  };
  
