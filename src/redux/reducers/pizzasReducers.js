import {PIZZAS_IS_FAILURE, PIZZAS_IS_FETCHING, PIZZAS_IS_SUCCESS} from "../actionTypes";

const initialState = {
  state: {
    isFetching: false,
    isSuccess: false,
    isFailure: false
  },
  pizzas: []
}

export const pizzasReducer = (state = initialState, action) => {
  switch (action.type) {
    case PIZZAS_IS_FETCHING:
      return {
        ...state,
        state: {
          isFetching: true,
          isSuccess: false,
          isFailure: false
        },
        pizzas: []
      }

    case PIZZAS_IS_SUCCESS:
      return {
        ...state,
        state: {
          isFetching: false,
          isSuccess: true,
          isFailure: false
        },
        pizzas: action.payload
      }

    case PIZZAS_IS_FAILURE:
      return {
        ...state,
        state: {
          isFetching: false,
          isSuccess: false,
          isFailure: true
        },
        pizzas: []
      }

    default:
      return state
  }

}

