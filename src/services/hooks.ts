import { useDispatch as dispatchHook } from "react-redux";
import { AppDispatch, AppThunk } from "../utils/prop-types";
import { TypedUseSelectorHook, useSelector as selectorHook } from "react-redux";
import { RootState } from "./reducers";
import { ChangeEvent, useState } from "react";

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;



interface IUseForm {
  [key: string]: string;
}

export const useForm = <T extends IUseForm>(inputValues: T) => {
  const [form, setForm] = useState(inputValues);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setForm({...form, [name]: value});
  };
  return { form, onChange, setForm };
};
