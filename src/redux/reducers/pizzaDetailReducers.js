import {PIZZA_DETAIL_IS_FETCHING, PIZZA_DETAIL_IS_SUCCESS, PIZZA_DETAIL_IS_FAILURE} from "../actionTypes";

const initialState = {
  state: {
    isFetching: false,
    isSuccess: false,
    isFailure: false
  },
  pizza: {}
}

export const pizzasDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case PIZZA_DETAIL_IS_FETCHING:
      return {
        ...state,
        state: {
          isFetching: true,
          isSuccess: false,
          isFailure: false
        },
        pizza: {}
      }

    case PIZZA_DETAIL_IS_SUCCESS:
      return {
        ...state,
        state: {
          isFetching: false,
          isSuccess: true,
          isFailure: false
        },
        pizza: action.payload
      }

    case PIZZA_DETAIL_IS_FAILURE:
      return {
        ...state,
        state: {
          isFetching: false,
          isSuccess: false,
          isFailure: true
        },
        pizza: {}
      }


    default:
      return state
  }

}

