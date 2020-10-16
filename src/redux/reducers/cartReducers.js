import {ADD_TO_CART, CHANGE_QTY, DELETE_FROM_CART, EMPTY_CART} from "../actionTypes";

const initialState = {
  pizzas: {}
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      let qty = state.pizzas[action.pizza.id]?.qty || 0
      qty += 1

      return {
        ...state,
        pizzas: {
          ...state.pizzas,
          [action.pizza.id]: {
            ...action.pizza,
            qty
          }
        }
      }
    }

    case DELETE_FROM_CART: {
      const {[action.id]: tmp, ...pizzas} = state.pizzas

      return {
        ...state,
        pizzas
      }
    }

    case CHANGE_QTY: {
      return {
        ...state,
        pizzas: {
          ...state.pizzas,
          [action.id]: {...state.pizzas[action.id], qty: action.qty}
        }
      }
    }

    case EMPTY_CART: {
      return initialState
    }

    default:
      return state
  }

}

