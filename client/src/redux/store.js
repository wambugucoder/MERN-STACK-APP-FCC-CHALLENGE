import { applyMiddleware, compose, createStore } from "redux";

import rootReducer from "./reducers";
import thunk from "redux-thunk";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
   
  )
);

export default store;