import { types } from "../types/types"; //nos ayuda a comparar que tipo de accion tomar

//accion para manejar los errores del formulario.
export const errorMsgForm = (msgError) => {
  return {
    type: types.uiSetError,
    payload: msgError,
  };
};

//accion para borrar el error
export const removeErrorMsgForm = () => {
  return {
    type: types.uiRemoveError,
  };
};

//accion activar loading
export const startLoading = () => {
  return { type: types.uiStartLoading };
};

//accion desactivar loading
export const finishLoading = () => {
  return { type: types.uiFinishLoading };
};
