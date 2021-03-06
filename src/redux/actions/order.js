import {
  CREATE_ORDER_IS_FETCHING,
  CREATE_ORDER_IS_FAILURE,
  CREATE_ORDER_IS_SUCCESS,
  GET_ORDERS_IS_FETCHING, GET_ORDERS_IS_SUCCESS
} from "../actionTypes";
import { HOST } from "../../config/routes";

export function createOrder(data) {

  return async dispatch => {
    dispatch({
      type: CREATE_ORDER_IS_FETCHING,
      payload: []
    })

    try {
      const response = await fetch(`${HOST}/api/orders/create`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      });
  
      const orderStatus = await response.json()
  
      dispatch({
        type: CREATE_ORDER_IS_SUCCESS,
        payload: orderStatus
      })

    } catch(err) {
      dispatch({
        type: CREATE_ORDER_IS_FAILURE,
        payload: []
      })

      throw 'Server Error! Orders is not created!';
    }
    
  }
}

export function getOrdersByUser(email) {
  return async dispatch => {
    dispatch({
      type: GET_ORDERS_IS_FETCHING,
      payload: []
    })

    const response = await fetch(`${HOST}/orders/get-order-by-user`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({email})
    });

    const orders = await response.json()

    dispatch({
      type: GET_ORDERS_IS_SUCCESS,
      payload: orders
    })
  }
}
