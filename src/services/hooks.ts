import {useDispatch as dispatchHook} from 'react-redux';
import { AppDispatch, AppThunk } from '../utils/prop-types';
import {TypedUseSelectorHook, useSelector as selectorHook} from "react-redux";
import { RootState } from './reducers';


export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

