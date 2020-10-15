import {DELETE_USER, SAVE_USER} from "../actionTypes";

const initialState = {
  user: {}
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        user: action.user
      }

    case DELETE_USER:
      return initialState

    default:
      return state
  }

}

