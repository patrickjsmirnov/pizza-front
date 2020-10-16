import { combineReducers } from 'redux'
import { pizzasReducer } from "./pizzasReducers"
import { pizzasDetailReducer } from "./pizzaDetailReducers";
import { cartReducer } from "./cartReducers";
import { userReducer } from "./userReducers";
import { orderReducer } from "./orderReducers";
import { createOrderReducer } from "./createOrderReducers";

export const rootReducer = combineReducers({
  pizzas: pizzasReducer,
  pizzaDetail: pizzasDetailReducer,
  cart: cartReducer,
  user: userReducer,
  orders: orderReducer,
  createOrder: createOrderReducer
})
