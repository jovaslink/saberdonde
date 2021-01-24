import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; //nos facilita dispatch y selector en las acciones
//importamos los reducers de la app
import { authReducer } from "../reducers/authReducer";
import { uiReducer } from "../reducers/uiReducer";
import { subscriptionReducer } from "../reducers/subscriptionReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  subscription: subscriptionReducer,
}); //compose para utilizar las herramientas de redux en el explorador y combinereducer que nos permite varios reducers

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
); // creamos el store, nuestra fuente unica de informacion
