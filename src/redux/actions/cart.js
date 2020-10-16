import {ADD_TO_CART, CHANGE_QTY, DELETE_FROM_CART, EMPTY_CART} from "../actionTypes";

export function addToCart(pizza) {
  return {
    type: ADD_TO_CART,
    pizza
  }
}

export function deleteFromCart(id) {
  return {
    type: DELETE_FROM_CART,
    id
  }
}

export function changeQty({ id, qty }) {
  return {
    type: CHANGE_QTY,
    id,
    qty
  }
}

export function emptyCart() {
  return {
    type: EMPTY_CART
  }
}
