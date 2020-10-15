import {CREATE_ORDER_IS_FETCHING, CREATE_ORDER_IS_FAILURE, CREATE_ORDER_IS_SUCCESS} from "../actionTypes";

export function createOrder(data) {

  return async dispatch => {
    dispatch({
      type: CREATE_ORDER_IS_FETCHING,
      payload: []
    })

    const response = await fetch('http://localhost:3003/orders/create', {
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
  }
}
