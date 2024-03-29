import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import userReducer from "./user";
import productReducer from "./product";
import reviewReducer from "./review";
import shoppingBagReducer from "./shoppingBag";
import orderReducer from "./order";
import orderItemReducer from "./orderItem";
// import imageReducer from "./image";

const rootReducer = combineReducers({
  session: sessionReducer,
  user: userReducer,
  product: productReducer,
  review: reviewReducer,
  bag: shoppingBagReducer,
  order: orderReducer,
  orderItem: orderItemReducer
  // image: imageReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
