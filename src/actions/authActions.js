import { types } from "../types/types";
import { firebase } from "../firebase/firebase-config";
import Swal from "sweetalert2";

//accion registrar usuario

export const newRegister = (name, email, password) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        //dispatch(removeErrorMsgForm());
        dispatch(login(user.uid, user.displayName, user.email));
      })
      .catch((e) => {
        //console.log(e.message);
        Swal.fire("ERROR", e.message, "error");
      });
  };
};

export const loginEmailPassword = (email, password) => {
  return (dispatch) => {
    //dispatch(startLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        //dispatch(removeErrorMsgForm());
        dispatch(login(user.uid, user.displayName, user.email));

        //dispatch(finishLoading());
      })
      .catch((e) => {
        //dispatch(finishLoading());
        //dispatch(errorMsgForm(e.message));
        Swal.fire("ERROR", e.message, "error");
        //console.log(e.message);
      });
  };
};

export const StartLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
    //dispatch(LogoutCleaning());
  };
};

export const login = (uid, name, email) => {
  return {
    type: types.login,
    payload: { uid, name, email },
  };
};

export const logout = () => {
  return {
    type: types.logout,
  };
};
