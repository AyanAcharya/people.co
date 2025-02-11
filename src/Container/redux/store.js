import { legacy_createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducer/index.js";
import { thunk } from "redux-thunk";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
