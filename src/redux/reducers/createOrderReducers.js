import {
  CREATE_ORDER_IS_SUCCESS,
  CREATE_ORDER_IS_FETCHING,
  CREATE_ORDER_IS_FAILURE
} from "../actionTypes";

const initialState = {
  state: {
    isFetching: false,
    isSuccess: false,
    isFailure: false
  },
  data: {}
}

export const createOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_IS_FETCHING:
      return {
        state: {
          isFetching: true,
          isSuccess: false,
          isFailure: false
        },
        data: {}
      }

    case CREATE_ORDER_IS_SUCCESS:
      return {
        state: {
          isFetching: false,
          isSuccess: true,
          isFailure: false
        },
        data: action.payload
      }

    case CREATE_ORDER_IS_FAILURE:
      return {
        state: {
          isFetching: false,
          isSuccess: false,
          isFailure: true
        },
        data: {}
      }

    default:
      return state
  }

}

