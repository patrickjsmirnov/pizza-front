import { GET_ORDERS_IS_SUCCESS, GET_ORDERS_IS_FETCHING, GET_ORDERS_IS_FAILURE } from "../actionTypes";

const initialState = {
  state: {
    isFetching: false,
    isSuccess: false,
    isFailure: false
  },
  data: []
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_IS_FETCHING:
      return {
        ...state,
        state: {
          isFetching: true,
          isSuccess: false,
          isFailure: false
        },
        data: []
      }

    case GET_ORDERS_IS_SUCCESS:
      return {
        ...state,
        state: {
          isFetching: false,
          isSuccess: true,
          isFailure: false
        },
        data: action.payload
      }

    default:
      return state
  }

}

