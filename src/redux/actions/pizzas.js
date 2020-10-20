import {
  PIZZA_DETAIL_IS_FAILURE,
  PIZZA_DETAIL_IS_SUCCESS,
  PIZZAS_IS_FETCHING,
  PIZZAS_IS_SUCCESS,
  PIZZA_DETAIL_IS_FETCHING,
  PIZZAS_IS_FAILURE
} from "../actionTypes";
import { HOST } from "../../config/routes";

export function fetchPizzas() {

  return async dispatch => {
    dispatch({
      type: PIZZAS_IS_FETCHING,
      payload: []
    })
    
    try {
      const response = await fetch(`${HOST}/api/pizzas`)
      const pizzas = await response.json()

      dispatch({
        type: PIZZAS_IS_SUCCESS,
        payload: pizzas
      })
    } catch(err) {
      dispatch({
        type: PIZZAS_IS_FAILURE,
        payload: []
      })
    }
  
  }
}

export function fetchPizza(id) {

  return async dispatch => {
    dispatch({
      type: PIZZA_DETAIL_IS_FETCHING,
      payload: {}
    })

    try {
      const response = await fetch(`${HOST}/api/pizzas/${id}`)
      const pizza = await response.json()

      dispatch({
        type: PIZZA_DETAIL_IS_SUCCESS,
        payload: pizza
      })

    } catch(err) {
      dispatch({
        type: PIZZA_DETAIL_IS_FAILURE,
        payload: {}
      })
    }
  }
}
