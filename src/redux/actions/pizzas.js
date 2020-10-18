import {
  PIZZA_DETAIL_IS_FAILURE,
  PIZZA_DETAIL_IS_SUCCESS,
  PIZZAS_IS_FETCHING,
  PIZZAS_IS_SUCCESS
} from "../actionTypes";
import { HOST } from "../../config/routes";

export function fetchPizzas() {

  return async dispatch => {
    dispatch({
      type: PIZZAS_IS_FETCHING,
      payload: []
    })

    const response = await fetch(`${HOST}/pizzas`)
    const pizzas = await response.json()

    dispatch({
      type: PIZZAS_IS_SUCCESS,
      payload: pizzas
    })
  }
}


export function fetchPizza(id) {

  return async dispatch => {
    dispatch({
      type: PIZZA_DETAIL_IS_FAILURE,
      payload: {}
    })

    const response = await fetch(`${HOST}/pizzas/${id}`)
    const pizza = await response.json()

    dispatch({
      type: PIZZA_DETAIL_IS_SUCCESS,
      payload: pizza
    })
  }
}
