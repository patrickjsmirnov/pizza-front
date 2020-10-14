import { combineReducers } from 'redux'
import { pizzasReducer } from "./pizzasReducers"
import { pizzasDetailReducer } from "./pizzaDetailReducers";
import { cartReducer } from "./cartReducers";

export const rootReducer = combineReducers({
  pizzas: pizzasReducer,
  pizzaDetail: pizzasDetailReducer,
  cart: cartReducer
})
