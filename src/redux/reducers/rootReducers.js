import { combineReducers } from 'redux'
import { pizzasReducer } from "./pizzasReducers"
import { pizzasDetailReducer } from "./pizzaDetailReducers";
import { cartReducer } from "./cartReducers";
import { userReducer } from "./userReducers";

export const rootReducer = combineReducers({
  pizzas: pizzasReducer,
  pizzaDetail: pizzasDetailReducer,
  cart: cartReducer,
  user: userReducer
})
