import { useState } from "react";

export const useForm = (initialState = {}) => {
  //maneja el estado y el cambio del valor del imput
  const [stateValues, setValues] = useState(initialState);

  const handlerInputForm = ({ target }) => {
    setValues({ ...stateValues, [target.name]: target.value });
  };

  //pone el valor del state en un objeto vacio
  const reset = (noteCurrent = initialState) => {
    setValues(noteCurrent);
  };

  return [handlerInputForm, stateValues, reset];
};
